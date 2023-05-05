from flask import Flask, render_template, request, jsonify
import numpy as np
import tensorflow as tf
from keras.models import load_model

app = Flask(__name__)


model = load_model('E:\dx\Level 6\Project\Topic-Ensemble Model for the Classification of Dog Breed\Codes\Saved Model\Ensemble_StackingVersion6.h5')

# inception_model = tf.keras.applications.InceptionV3(weights='imagenet', include_top=False, input_shape=(299, 299, 3))
# vgg_model = tf.keras.applications.VGG16(weights='imagenet', include_top=False, input_shape=(224, 224, 3))
# resnet_model = tf.keras.applications.ResNet50(weights='imagenet', include_top=False, input_shape=(224, 224, 3))

# preprocess VGG ResNet
def preprocess224VGG(img_path):
    img = tf.keras.preprocessing.image.load_img(img_path, target_size=(224, 224))
    x = tf.keras.preprocessing.image.img_to_array(img)
    x = tf.keras.applications.vgg16.preprocess_input(x)
    return x

def preprocess224Resnet(img_path):
    img = tf.keras.preprocessing.image.load_img(img_path, target_size=(224, 224))
    x = tf.keras.preprocessing.image.img_to_array(img)
    x = tf.keras.applications.resnet.preprocess_input(x)
    return x

# preprocess InceptionV3
def preprocess299(img_path):
    img = tf.keras.preprocessing.image.load_img(img_path, target_size=(299, 299))
    x = tf.keras.preprocessing.image.img_to_array(img)
    x = tf.keras.applications.inception_v3.preprocess_input(x)
    return x


# def predict(img_path):
#     breed = []
#
#     with open('E:/dx/Level 6/Project/breeds.txt', 'r') as f:
#         for line in f:
#             breed.append(line.strip())
#     x = preprocess299(img_path)
#     x_inception = inception_model.predict(np.array([x]))[0]

    # y = preprocess224VGG(img_path)


    # x_vgg = vgg_model.predict(np.array([y]))[0]

    # z = preprocess224Resnet(img_path)

    # x_inception = inception_model.predict(np.array([x]))[0]
    # x_vgg = vgg_model.predict(np.array([y]))[0]
    # x_resnet = resnet_model.predict(np.array([z]))[0]
    # x_ensemble = [x_inception, x_vgg, x_resnet]
    # y_pred = model.predict(x_ensemble)[0]

    # print(y_pred)
    # print(len(x_vgg)) # 7
    # print(len(x_resnet)) #7
    # print(len(x_inception)) #8

    # x_ensemble = [np.array([y]), np.array([z]), np.array([x])]
    # y_pred = model.predict(x_ensemble)[0]
    #
    # breed_idx = np.argmax(y_pred)
    # breed_name = breed[breed_idx]
    # breed_prob = y_pred[breed_idx]
    #
    # return breed_name, breed_prob

# 预测函数
def predict(img_path):
    breed = []

    with open('E:/dx/Level 6/Project/breeds.txt', 'r') as f:
        for line in f:
            breed.append(line.strip())
    x = preprocess299(img_path)
    y = preprocess224VGG(img_path)
    z = preprocess224Resnet(img_path)

    x_ensemble = [np.array([y]), np.array([z]), np.array([x])]
    y_pred = model.predict(x_ensemble)[0]

    # Get the breed index with the highest probability
    breed_idx = np.argmax(y_pred)
    breed_name = breed[breed_idx]
    breed_prob = y_pred[breed_idx]

    # Get the second-highest probability and corresponding breed
    y_pred[breed_idx] = 0
    second_breed_idx = np.argmax(y_pred)
    second_breed_name = breed[second_breed_idx]
    second_breed_prob = y_pred[second_breed_idx]

    return breed_name, breed_prob, second_breed_name, second_breed_prob

# @app.route('/', methods=['POST'])
# def home():

#     imagefile = request.files['file']
#     image_path = "./images/" + imagefile.filename
#     imagefile.save(image_path)
#
#     breed_name, breed_prob, second_breed_name, second_breed_prob = predict(image_path)
#
#     return render_template('index.html', prediction=breed_name, probability=breed_prob, second_breed_name = second_breed_name, second_breed_prob = second_breed_prob)

@app.route('/', methods=['GET'])
def showIndex():
    return render_template('index.html')

@app.route('/identify', methods=['GET'])
def test():
    return render_template('identification.html')

@app.route('/identify', methods=['POST'])
def testHome():

    imagefile = request.files['file']
    image_path = "./images/" + imagefile.filename
    print(image_path)
    imagefile.save(image_path)

    breed_name, breed_prob, second_breed_name, second_breed_prob = predict(image_path)

    # Return the results as a JSON object
    data = {'breed1': breed_name, 'prob1': float(breed_prob), 'breed2': second_breed_name, 'prob2': float(second_breed_prob)}
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)

