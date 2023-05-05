import os
import cv2

# input path
src = 'E:/dx/Level 6/Project/Topic-Ensemble Model for the Classification of Dog Breed/Dataset/others/70dog breeds-224/test'

# output path
des = 'E:/dx/Level 6/Project/Topic-Ensemble Model for the Classification of Dog Breed/Dataset/others/70dog breeds-299/test'

# loop over each subdirectory in src directory
for root, dirs, files in os.walk(src):
    # iterate over all files in each subdirectory
    for file in files:
        # construct input and output image paths
        imgsrcpath1 = os.path.join(root, file)
        imgdespath1 = imgsrcpath1.replace(src, des)

        # create output directory if it doesn't exist
        output_dir = os.path.dirname(imgdespath1)
        if not os.path.exists(output_dir):
            os.makedirs(output_dir)

        # read image and resize it
        imgsrc = cv2.imread(imgsrcpath1)
        imgdes = cv2.resize(imgsrc, (299, 299), interpolation=cv2.INTER_LINEAR)

        # write the resized image to output path
        cv2.imwrite(imgdespath1, imgdes)
