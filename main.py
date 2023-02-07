from flask import Flask, request, render_template, jsonify
import json
import requests
import os

app = Flask(__name__)
API_KEY = "459d6890759a46e18ec3bff6ac304f45" #heroku
API_KEY = "ed97ce280fd047f2b75791d8bb9e8fab" #xafosico
API_KEY = "3d7b2193ddc2428fae65f393615763e8" #school
API_KEY = "9459b77b3de14757b8581ec4dcea4c23" #my
API_KEY = "f3cd0361edff4cafaec27267cc4ac7fa" #my 2

def apiSearch(query):
    #https://api.spoonacular.com/recipes/complexSearch?query=pasta&apiKey=ed97ce280fd047f2b75791d8bb9e8fab
    r = json.loads(requests.get("https://api.spoonacular.com/recipes/complexSearch?number=14&query=" + query + "&apiKey=" + API_KEY).text)["results"]
    response = [r[:7], r[7:]]
    return response

def apiRecipe(id):
    #https://api.spoonacular.com/recipes/782585/information?apiKey=ed97ce280fd047f2b75791d8bb9e8fab
    response = json.loads(requests.get("https://api.spoonacular.com/recipes/" + str(id) + "/information?apiKey=" + API_KEY).text)
    return response

def getRandomRecipes():
    #https://api.spoonacular.com/recipes/random?number=14&apiKey=ed97ce280fd047f2b75791d8bb9e8fab
    response = [json.loads(requests.get("https://api.spoonacular.com/recipes/random?number=7&apiKey=" + API_KEY).text)["recipes"] for i in range(2)]
    return response

@app.route('/', methods = ['POST', 'GET'])
def result():
    listOfRecipes = ""
    if request.method == 'POST':
        if request.form.get('search') != "":
            search = request.form.get('search').replace(" ", ",")
            listOfRecipes = apiSearch(search)
    return render_template('index.html', list = getRandomRecipes() if not listOfRecipes else listOfRecipes)

@app.route("/get_id", methods=["POST"])
def get_id():
    id = request.form.get("id")
    print(id)
    return jsonify(apiRecipe(id))

@app.route("/get_content")
def get_content():
    return jsonify("Gghghghhg")

if __name__ == "__main__":
    app.run(debug = True, host="0.0.0.0", port=int(os.environ.get("PORT", 5000))) 
