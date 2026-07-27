import email
import imaplib
import json
import os
import smtplib
from email.header import decode_header
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from openai import OpenAI

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

GMAIL_USER = os.getenv("GMAIL_USER")
GMAIL_PASS = os.getenv("GMAIL_PASS")
SUPERVISOR_EMAIL = os.getenv("SUPERVISOR_EMAIL")


def cargar_base_conocimiento():
    """Lee la base de conocimiento desde el archivo local."""
    if os.path.exists("base_conocimiento.txt"):
        with open("base_conocimiento.txt", "r", encoding="utf-8") as f:
            return f.read()
    return "No hay información adicional disponible en la base de datos."


def leer_correos_no_leidos():
    """Conecta por IMAP y obtiene los correos no leídos."""
    correos = []
    try:
        mail = imaplib.IMAP4_SSL("imap.gmail.com")
        mail.login(GMAIL_USER, GMAIL_PASS)
        mail.select("inbox")

        status, messages = mail.search(None, "UNSEEN")
        if status != "OK" or not messages[0]:
            print("No hay correos no leídos.")
            mail.logout()
            return []

        for mail_id in messages[0].split():
            res, msg_data = mail.fetch(mail_id, "(RFC822)")
            for response_part in msg_data:
                if isinstance(response_part, tuple):
                    msg = email.message_from_bytes(response_part[1])

                    subject, encoding = decode_header(msg["Subject"])[0]
                    if isinstance(subject, bytes):
                        subject = subject.decode(encoding or "utf-8")

                    from_addr = msg.get("From")

                    body = ""
                    if msg.is_multipart():
                        for part in msg.walk():
                            if part.get_content_type() == "text/plain":
                                body = part.get_payload(decode=True).decode(
                                    "utf-8", errors="ignore"
                                )
                                break
                    else:
                        body = msg.get_payload(decode=True).decode(
                            "utf-8", errors="ignore"
                        )

                    correos.append(
                        {
                            "id": mail_id,
                            "from": from_addr,
                            "subject": subject,
                            "body": body,
                        }
                    )

        mail.logout()
        return correos
    except Exception as e:
        print(f"Error al leer correos: {e}")
        return []


def analizar_y_responder(asunto, cuerpo, base_conocimiento):
    """Evalúa la duda, detecta idioma y decide si requiere supervisión."""
    prompt_sistema = f"""
    Eres el agente de atención del Observatorio de Igualdad Educativa Inclusiva (EqualEdu / OIEI).
    Analiza la consulta utilizando EXCLUSIVAMENTE la siguiente Base de Conocimiento:

    --- BASE DE CONOCIMIENTO ---
    {base_conocimiento}
    --- FIN BASE DE CONOCIMIENTO ---

    INSTRUCCIONES:
    1. Detecta el idioma de la consulta y redacta la respuesta en ese MISMO idioma.
    2. Evalúa si la Base de Conocimiento contiene la información para responder con total certeza.
    3. Si la respuesta no está clara o falta información, marca "requiere_supervision": true.
    4. Si el mensaje proviene de un sistema automático o de publicidad, marca "no_responder": true.

    RESPONDE ÚNICAMENTE EN FORMATO JSON CON ESTA ESTRUCTURA:
    {{
        "idioma_detectado": "idioma",
        "no_responder": false,
        "requiere_supervision": false,
        "motivo_duda": "razón breve si aplica",
        "propuesta_respuesta": "texto redactado de respuesta"
    }}
    """

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            response_format={"type": "json_object"},
            messages=[
                {"role": "system", "content": prompt_sistema},
                {
                    "role": "user",
                    "content": f"Asunto: {asunto}\n\nMensaje:\n{cuerpo}",
                },
            ],
            temperature=0.2,
        )
        return json.loads(response.choices[0].message.content)
    except Exception as e:
        print(f"Error al llamar a OpenAI: {e}")
        return None


def enviar_correo(destinatario, asunto, cuerpo):
    """Envía un correo mediante SMTP."""
    try:
        msg = MIMEMultipart()
        msg["From"] = GMAIL_USER
        msg["To"] = destinatario
        msg["Subject"] = asunto
        msg.attach(MIMEText(cuerpo, "plain", "utf-8"))

        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(GMAIL_USER, GMAIL_PASS)
            server.send_message(msg)
        print(f"Correo enviado correctamente a {destinatario}")
    except Exception as e:
        print(f"Error al enviar correo: {e}")


def main():
    print("Iniciando revisión de la bandeja de entrada...")
    base_conocimiento = cargar_base_conocimiento()
    correos = leer_correos_no_leidos()

    for item in correos:
        print(f"Procesando correo de: {item['from']}")
        analisis = analizar_y_responder(
            item["subject"], item["body"], base_conocimiento
        )

        if not analisis or analisis.get("no_responder"):
            print("Mensaje omitido (spam o no respondible).")
            continue

        if analisis.get("requiere_supervision"):
            asunto_sup = f"[REVISIÓN REQUERIDA] Re: {item['subject']}"
            cuerpo_sup = f"""Se requiere tu aprobación para la siguiente consulta.

De: {item['from']}
Idioma: {analisis.get('idioma_detectado')}
Motivo de duda: {analisis.get('motivo_duda')}

--- CONSULTA RECIBIDA ---
{item['body']}

--- PROPUESTA DE RESPUESTA (IA) ---
{analisis.get('propuesta_respuesta')}
"""
            enviar_correo(SUPERVISOR_EMAIL, asunto_sup, cuerpo_sup)
        else:
            enviar_correo(
                item["from"],
                f"Re: {item['subject']}",
                analisis.get("propuesta_respuesta"),
            )


if __name__ == "__main__":
    main()
