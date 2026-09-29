import sys
from PIL import Image, ImageChops
import numpy as np
orig_rr, new_rr, shipped, out = sys.argv[1:5]
a=Image.open(orig_rr).convert('RGB'); b=Image.open(new_rr).convert('RGB'); s=Image.open(shipped)
assert a.size==b.size==s.size and s.mode=='P'
x=np.asarray(ImageChops.difference(a,b)).astype(int).sum(axis=2)
ys,xs=np.where(x>30); x0,y0,x1,y1=xs.min(),ys.min(),xs.max(),ys.max()
pad=6; box=(int(max(0,x0-pad)),int(max(0,y0-pad)),int(min(a.size[0],x1+pad+1)),int(min(a.size[1],y1+pad+1)))
print('patch box', box)
patch=b.crop(box).quantize(palette=s, dither=Image.Dither.NONE)
res=s.copy(); res.paste(patch, box[:2]); res.save(out, optimize=True)
d=np.asarray(ImageChops.difference(res.convert('RGB'), s.convert('RGB'))).astype(int).sum(axis=2)
yy,xx=np.where(d>0); print('diff vs shipped only inside', (int(xx.min()),int(yy.min()),int(xx.max()),int(yy.max())) if len(yy) else None)
