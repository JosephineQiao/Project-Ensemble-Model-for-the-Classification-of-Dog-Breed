%Named according to the name before resize
fileFolder=fullfile('E:\dx\Level 6\Project\Topic-Ensemble Model for the Classification of Dog Breed\Codes\Dog-Breed-Classification-using-Ensemble-Pretrained-Models-main\train');%input image path
dirOutput=dir(fullfile(fileFolder,'*.jpg'));%Read images from a folder
OtpDir = 'E:\dx\Level 6\Project\Topic-Ensemble Model for the Classification of Dog Breed\Dataset\120dog breeds-299\train';%output store folder path
fileNames = {dirOutput.name};%Get the name of each image
len = length(dirOutput)
for i = 1:len
   fileName = fileNames{1,i};
   bgFile = fileFolder + "\" + fileName;
   bgFile = imread(bgFile);
   img = imresize(bgFile,[299,299]);%224 * 224
    filename = fileName;
    path=fullfile(OtpDir,filename);%Output path
    imwrite(img,path,'jpg');%Export out in jpg format
end