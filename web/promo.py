from flask import Flask, render_template, redirect

ip_servidor = ""
url_servidor = "https//" + ip_servidor + ":5000"

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/pc')
def pc():
    return render_template('pc.html', url_servidor=url_servidor)

@app.route('/celular')
def celular():
    return render_template('celular.html')

@app.route('/apk')
def apk():
    return redirect('web/apk/app-release.apk')

if __name__ == '__main__':
    app.run(debug=True, host=ip_servidor, port=5000)