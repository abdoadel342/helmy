import os

p = os.path.join('src', 'pages', 'Nutrition.tsx')
lines = open(p, encoding='utf-8').readlines()

# Keep lines 0-267 (new accordion content) 
keep_start = lines[:268]

# Find where the real Hydration section starts (after the old duplicate cards)
# We need to find the second "Hydration Section" comment or the FadeContent before it
hydration_line = None
for i in range(268, len(lines)):
    line = lines[i].strip()
    if 'water_drop' in line and 'material-symbols' in line:
        # Go back to find the FadeContent start
        for j in range(i, 267, -1):
            if 'FadeContent' in lines[j]:
                hydration_line = j
                break
        break

if hydration_line:
    rest = lines[hydration_line:]
    # But we need the comment line too
    # Check if there's a Hydration Section comment before
    for k in range(hydration_line, max(hydration_line - 5, 267), -1):
        if 'Hydration' in lines[k]:
            rest = lines[k:]
            break
    
    new_content = keep_start + ['\n'] + rest
    open(p, 'w', encoding='utf-8').writelines(new_content)
    print(f"Done! Removed lines 269-{hydration_line}. New file has {len(new_content)} lines.")
else:
    print("Could not find hydration section!")
    # Print what's around line 268
    for i in range(268, min(280, len(lines))):
        print(f"{i+1}: {lines[i].rstrip()}")
