import os
import re

source_file = 'struk-4.html'
# List of all target files based on standard naming or explicit list
target_files = [
    'struk-5.html', 'struk-7.html', 'struk-9.html', 'struk-10.html',
    'struk-12.html', 'struk-13.html', 'struk-14.html', 'struk-31.html',
    'struk10.html', 'struk.11.html'
]

# Read the source content (Golden Master)
with open(source_file, 'r') as f:
    source_content = f.read()

# Verify source has the correct ID placeholders/structure
if "window.receiptId = '4'" not in source_content:
    print(f"Error: Source file {source_file} does not contain the expected ID '4'")
    exit(1)

for target in target_files:
    if not os.path.exists(target):
        print(f"Skipping {target} (not found)")
        continue

    # 1. Read existing ID from target
    with open(target, 'r') as f:
        old_content = f.read()
    
    # Extract ID using regex
    match = re.search(r"window\.receiptId\s*=\s*['\"]([^'\"]+)['\"]", old_content)
    if not match:
        print(f"Skipping {target} (could not find existing receiptId)")
        continue
    
    current_id = match.group(1)
    
    # 2. Prepare new content
    # Replace ID '4' from source with current_id
    new_content = source_content.replace("window.receiptId = '4'", f"window.receiptId = '{current_id}'")
    
    # 3. Write data
    with open(target, 'w') as f:
        f.write(new_content)
        
    print(f"Updated {target} with ID {current_id}")
