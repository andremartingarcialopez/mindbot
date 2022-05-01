# -*- coding: utf-8 -*-
"""
Created on Mon Dec  7 01:00:30 2020

@authors: lucio
"""

from flask import Flask, jsonify, request, Response
from flask_pymongo import PyMongo
import pandas
from sklearn import tree
from sklearn.tree import DecisionTreeClassifier
import matplotlib.pyplot as plt

app = Flask(__name__)

app.config['MONGO_URI'] = 'mongodb+srv://admin:Admin.123@chatbot.4nzz7.mongodb.net/chatbot'
mongo = PyMongo(app)

df = pandas.read_csv("test_emocional.csv")

preguntas = ['Te has sentido triste o decaído?', 
            'Has tenido ganas de llorar o has llorado?', 
            'Te has sentido cansado sin razon aparente?', 
            'Te has sentido inquieto e intranquilo?', 
            'Te has sentido más irritable que de costumbre?',
            'No te has sentido muy útil y necesario?',
            'No has disfrutado tus actividades cotidianas?',
            'No has encontrado agradable vivir?',
            'Te has sentido atemorizado sin motivo?',
            'Sufres fuertes dolores de cabeza y/o cuello?',
            'Sientes que el corazón late más rápido?',
            'Orino o siento ganas de orinar con mucha frecuencia?',
            'Subres de dolores de estómago e indigestión?',
            'No duermes falcimente y descanso por las noches?',
            'Tienes pesadillas?',
            'No puedes conciliar el sueño la primera media hora despues de acostarte?',
            'No puedes respirar cómodamente?']

estados = ['Sintomas altos de depresión',
           'Sintomas leves de depresión',
           'Sintomas de ansiedad',
           'Sintomas leves de ansiedad',
           'Sintomas altos de problemas de sueño',
           'Problemas leves',
           'Sintomas casi inexistentes']

X = df[preguntas]
y = df['estados']

print(X)

plt.figure(figsize=(50,25),dpi=300)
dtree = DecisionTreeClassifier()

dtree = dtree.fit(X, y)
tree.plot_tree(dtree, feature_names=preguntas, class_names=estados, filled=True)
#plt.show()

@app.route('/evaluation/<id>', methods=['GET'])
def get_result(id):
    result = mongo.db.results.find_one({'_id': ObjectId(id), })
    predict = 'El estado es: '+{estados[dtree.predict([result])[0]]}
    response = json_util.dumps(predict)

    return Response(response, mimetype="application/json")

#Ansiedad Moderada
#print(f'El estado es: {estados[dtree.predict([[0,1,2,3,1,0,2,1,1,1,2,3,1,0,2,1,0]])[0]]}')

#Sintomas altos de depresión
#print(f'El estado es: {estados[dtree.predict([[2,3,1,3,3,3,1,2,1,1,3,2,2,1,3,2,1]])[0]]}')

#Prueba
#print(f'El estado es: {estados[dtree.predict([[3,3,3,3,3,3,0,0,0,0,0,0,0,0,0,0,0]])[0]]}')










