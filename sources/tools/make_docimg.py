# Makes the JPEG copies of the mockups that build_docx.js embeds (1800 px wide, quality 80) + docimg/meta.json.
import json, os, glob
from PIL import Image
os.makedirs('docimg', exist_ok=True); meta = {}
for f in sorted(glob.glob('mockups/*.png')):
    name = os.path.basename(f); im = Image.open(f).convert('RGB')
    h = round(im.height * 1800 / im.width); jpg = 'docimg/' + name[:-4] + '.jpg'
    im.resize((1800, h), Image.LANCZOS).save(jpg, 'JPEG', quality=80)
    meta[name] = {'jpg': jpg, 'w': 1800, 'h': h}
json.dump(meta, open('docimg/meta.json', 'w'), indent=1); print(len(meta), 'images')
