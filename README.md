Avaliação Técnica — MyByte

Obrigado pela oportunidade de participar do processo seletivo. Fico feliz em mostrar minhas habilidades!


Teste 1 — Formulário Estilizado (HTML, CSS, JS)

Preview
<img width="1919" height="964" alt="image" src="https://github.com/user-attachments/assets/f4bfe08e-376a-49d3-85f1-b932c8478879" />

Tecnologias

HTML5
CSS3
JavaScript

Como rodar (passo a passo)

no terminal: cd teste-1
Windows
py -m http.server 5500
macOS/Linux
python3 -m http.server 5500

abra http://localhost:5500
(ou abra o arquivo index.html diretamente no navegador)

-------------------------------------------------------------------------------------------------------------------------------------

Teste 2 — Cálculos Financeiros (React + Django REST)

Preview
<img width="1917" height="966" alt="image" src="https://github.com/user-attachments/assets/5374a665-be53-4d8d-ae68-12e792d111f9" />


Tecnologias

Front-end: React + Vite (JSX, fetch)
Back-end: Django 5 + Django REST Framework
CORS: django-cors-headers 

Como rodar (passo a passo)

1) Back-end (Django + DRF)
cd teste-2/backend

criar/ativar venv
python -m venv .venv
Windows
.\.venv\Scripts\activate
macOS/Linux
source .venv/bin/activate

dependências
pip install -r requirements.txt

migrações + servidor
python manage.py migrate
python manage.py runserver 8000
API: http://localhost:8000/api/v1/health => {"status": "ok"}

2) Front-end (React + Vite)
cd ../frontend
npm install
npm run dev

abra http://localhost:5173
