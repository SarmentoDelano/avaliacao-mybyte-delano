Avaliação Técnica — MyByte

Obrigado pela oportunidade de participar do processo seletivo. Fico feliz em mostrar minhas habilidades!

Teste 1 — Formulário Estilizado (HTML, CSS, JS)
Preview

<img width="1920" height="968" alt="image" src="https://github.com/user-attachments/assets/c0279984-d486-46b8-850e-15a169256f52" />


Tecnologias

HTML5

CSS3

JavaScript

Como rodar (passo a passo)

no terminal:

cd teste-1


Windows

py -m http.server 5500


macOS/Linux

python3 -m http.server 5500


Acesse: http://localhost:5500
(ou abra o arquivo index.html diretamente no navegador)

Teste 2 — Cálculos Financeiros (React + Django REST)
Preview

<img width="1920" height="969" alt="image" src="https://github.com/user-attachments/assets/e3171af9-0245-4244-ba47-79eaddf2cf26" />


Tecnologias

Front-end: React + Vite (JSX, fetch)

Back-end: Django 5 + Django REST Framework

CORS: django-cors-headers

Como rodar (passo a passo)
Back-end (Django + DRF)
cd teste-2/backend


criar/ativar venv

python -m venv .venv


Windows

.\.venv\Scripts\activate


macOS/Linux

source .venv/bin/activate


Dependências

pip install -r requirements.txt


Migrações + servidor

python manage.py migrate
python manage.py runserver 8000


API: http://localhost:8000/api/v1/health => {"status": "ok"}

Front-end (React + Vite)
cd ../frontend
npm install
npm run dev


Acesse: http://localhost:5173
