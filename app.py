from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def inicio():
    return render_template('index.html')

@app.route('/quienes')
def quienes():
    return render_template('quienes.html')

@app.route('/productos')
def productos():
    return render_template('productos.html')

@app.route('/carrito')
def carrito():
    return render_template('carrito.html')

@app.route('/referencias')
def referencias():
    return render_template('referencias.html')

@app.route('/contacto')
def contacto():
    return render_template('contacto.html')


if __name__ == '__main__':
    app.run(debug=True)
