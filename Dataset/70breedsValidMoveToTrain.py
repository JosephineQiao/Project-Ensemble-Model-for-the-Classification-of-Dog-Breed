

import os
import shutil

train_dir = 'E:/dx/Level 6/Project/Topic-Ensemble Model for the Classification of Dog Breed\Dataset/others/70dog breeds-224/train'
valid_dir = 'E:/dx/Level 6/Project/Topic-Ensemble Model for the Classification of Dog Breed\Dataset/others/70dog breeds-224/valid'

# src_dir = "E:/dx/Level 6/Project/Topic-Ensemble Model for the Classification of Dog Breed\Dataset/others/70dog breeds-224/valid"
# dest_dir = "E:/dx/Level 6/Project/Topic-Ensemble Model for the Classification of Dog Breed\Dataset/others/70dog breeds-224/train"

for root, dirs, files in os.walk(valid_dir):
    for file in files:

        class_name = os.path.basename(root)

        new_filename = os.path.splitext(file)[0] + '_valid' + os.path.splitext(file)[1]

        shutil.move(os.path.join(root, file), os.path.join(train_dir, class_name, new_filename))
