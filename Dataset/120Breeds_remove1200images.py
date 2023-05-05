import os
import csv


with open('E:/dx/Level 6/Project/breeds.txt') as f:
    breeds = [line.strip() for line in f]
print(len(breeds))

data = {}
with open('E:/dx/Level 6/Project/Topic-Ensemble Model for the Classification of Dog Breed/Codes/Dog-Breed-Classification-using-Ensemble-Pretrained-Models-main/labels.csv') as f:
    reader = csv.reader(f)
    for row in reader:
        if row[1] in data:
            data[row[1]].append(row[0])
        else:
            data[row[1]] = [row[0]]


# os.makedirs('new_folder', exist_ok=True)


for breed in breeds:
    os.makedirs(os.path.join('E:\\dx\\Level 6\\Project\\Topic-Ensemble Model for the Classification of Dog Breed\\Dataset\\120dog breeds-299\\test', breed), exist_ok=True)


    for filename in data[breed][:10]:
        source_path = os.path.join('E:\\dx\\Level 6\\Project\\Topic-Ensemble Model for the Classification of Dog Breed\\Dataset\\120dog breeds-299\\train', filename + '.jpg')
        destination_path = os.path.join('E:\\dx\\Level 6\\Project\\Topic-Ensemble Model for the Classification of Dog Breed\\Dataset\\120dog breeds-299\\test', breed, filename + '.jpg')

        os.rename(source_path, destination_path)
        data[breed].remove(filename)




