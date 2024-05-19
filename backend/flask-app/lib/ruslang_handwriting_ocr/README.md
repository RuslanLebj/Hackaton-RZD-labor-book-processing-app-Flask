# RusLang HandWriting OCR

SHIFT OCR is a library for handwriting text segmentation and character recognition.
 
# Get Started (Python 3.9, Python 3.10)

## Doc2Text
`Reader` from `doc2text` performs text detection and the following recognition.


```

from ruslang_handwriting_ocr.doc2text.reader import Reader
   
reader = Reader()
result = reader.doc2text("test.png")

```

Display recognized text:

```
print(result[0])
```

Display segmented crops:

```
import matplotlib.pyplot as plt

def show_img_grid(images, N):
    n = int(N**(0.5))
    k = 0
    f, axarr = plt.subplots(n,n,figsize=(10,10))
    for i in range(n):
        for j in range(n):
            axarr[i,j].imshow(images[k].img)
            k += 1
    f.show()

show_img_grid(result[1], 48)
```
