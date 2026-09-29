import sys
from PIL import Image, ImageChops
import numpy as np
a=Image.open(sys.argv[1]).convert('RGB'); b=Image.open(sys.argv[2]).convert('RGB')
print('sizes', a.size, b.size)
if a.size==b.size:
    x=np.asarray(ImageChops.difference(a,b)).astype(int).sum(axis=2)
    ys,xs=np.where(x>100); print('px>30:', (x>30).sum(), ' px>100:', len(ys), ' bbox>100:', (xs.min(),ys.min(),xs.max(),ys.max()) if len(ys) else None)
