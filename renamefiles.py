import os
import re

def rename_files(root_dir):
    pattern = re.compile(r'([a-z]+)_([a-z]+)_skin(\d+)\.glb', re.IGNORECASE)
    category_map = {
        'heels': '2',
        'flat': '1',
    }

    for folder, _, files in os.walk(root_dir):
        for file in files:
            match = pattern.fullmatch(file)
            if match:
                category, size, skin_number = match.groups()
                cat_number = category_map.get(category.lower())
                if not cat_number:
                    print(f"Skipping: {file} (unknown category '{category}')")
                    continue
                new_name = f"{size.upper()}_{cat_number}_{int(skin_number)}.glb"
                old_path = os.path.join(folder, file)
                new_path = os.path.join(folder, new_name)
                print(f"Renaming: {old_path} -> {new_path}")
                os.rename(old_path, new_path)
            else:
                print(f"Skipping: {file} (does not match pattern)")

# Replace this with your actual root folder
rename_files('/Users/omidmirzaeeyazdi/Desktop/projects/josnsof-dressing-room/shoes 2/shoes')
