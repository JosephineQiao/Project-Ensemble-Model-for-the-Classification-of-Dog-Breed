
% for i = 1: 10 
% 
%     A = imread('E:\dx\Level 6\Project\Topic-Ensemble Model for the Classification of Dog Breed\Dataset\70dog breeds-224\test\Afghan\0'+ i +'.jpg')
%     image(A);
%     pic1 = imresize(A, [229 229]);
%     % image(pic1);
%     % figure, imshow(pic1)
%     % title(string(pic))
%     imwrite(pic1,'E:\dx\Level 6\Project\Topic-Ensemble Model for the Classification of Dog Breed\Dataset\70dog breeds-229\test\Afghan\Afghan_'+ i+ '.jpg')
%     
% end


%input path
src='E:\dx\Level 6\Project\Topic-Ensemble Model for the Classification of Dog Breed\Dataset\70dog breeds-224\valid';
%output path
des='E:\dx\Level 6\Project\Topic-Ensemble Model for the Classification of Dog Breed\Dataset\70dog breeds-229\valid';
pathlist1=dir(src);
filenum1=length(pathlist1);
filenamelist1={pathlist1.name};
for i=3:filenum1
    %Do a nesting to read the images in a subfolder
    imgsrcpath=[src,'\',filenamelist1{i}];
    imgdespath=[des,'\',filenamelist1{i}];
    pathlist2=dir(imgsrcpath);
    filenum2=length(pathlist2);
    filenamelist2={pathlist2.name};
    for j=3:filenum2
        imgsrcpath1=[imgsrcpath,'\',filenamelist2{j}];
        imgdespath1=[imgdespath,'\',filenamelist2{j}];
        imgsrc=imread(imgsrcpath1);
        %imgdes=imresize(imgsrc,[160,160],'bilinear');
        imgdes=imresize(imgsrc,[229,229]);
        imwrite(imgdes,imgdespath1);
    end
    %i use this to see how many folders are processed
    i
end
