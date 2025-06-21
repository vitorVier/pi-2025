import sqlite3
from datetime import datetime

DB_PATH = "diagnosticos.db"

def criar_tabela():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS diagnosticos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        idade INTEGER,
        genero TEXT,
        resultado INTEGER,
        confianca REAL,
        data TEXT
    )
    """)
    conn.commit()
    conn.close()

def salvar_diagnostico(dados):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO diagnosticos (idade, genero, resultado, confianca, data)
        VALUES (?, ?, ?, ?, ?)
    """, (dados['idade'], dados['genero'], dados['resultado'], dados['confianca'], dados['data']))
    conn.commit()
    conn.close()

def get_relatorio():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    cursor.execute("SELECT COUNT(*) FROM diagnosticos")
    total = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM diagnosticos WHERE resultado = 1")
    diabetes = cursor.fetchone()[0]

    cursor.execute("SELECT AVG(idade) FROM diagnosticos")
    idadeavg = cursor.fetchone()[0] or 0

    cursor.execute("SELECT COUNT(*) FROM diagnosticos WHERE confianca > 0.7")
    risco = cursor.fetchone()[0]

    conn.close()

    risco_percent = (risco / total * 100) if total > 0 else 0

    return {
        "total_diagnosticos": total,
        "casos_diabetes": diabetes,
        "idadeavg": round(idadeavg, 2),
        "risco": round(risco_percent, 2),
    }

def obter_total_diagnosticos():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("SELECT COUNT(*) FROM diagnosticos")
    total = cursor.fetchone()[0]
    conn.close()
    return total

def listar_diagnosticos():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("""
        SELECT id, idade, genero, resultado, confianca, data
        FROM diagnosticos
        ORDER BY data DESC
    """)
    rows = cursor.fetchall()
    conn.close()

    return [
        {
            "id": row[0],
            "age": row[1],
            "gender": row[2],
            "result": row[3],
            "trust": row[4],
            "date": row[5]
        } for row in rows
    ]

# Criar tabela na inicialização
criar_tabela()
