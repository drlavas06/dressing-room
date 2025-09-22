import replicate
import os
import time
from pathlib import Path

def enhance_image_from_file(image_path, output_path):
    """Enhance image directly from file path using the exact parameters from the example"""
    try:
        print(f"Enhancing image: {image_path.name}")
        
        # Open the image file and pass it directly to Replicate
        with open(image_path, "rb") as image_file:
            output = replicate.run(
                "fermatresearch/magic-image-refiner:507ddf6f977a7e30e46c0daefd30de7d563c72322f9e4cf7cbac52ef0f667b13",
                input={
                    "hdr": 0.06,
                    "image": image_file,
                    "steps": 20,
                    "prompt": "UHD 4k vogue, a high quality women, real skin texture, freckles ",
                    "scheduler": "DDIM",
                    "creativity": 0.25,
                    "guess_mode": False,
                    "resolution": "original",
                    "resemblance": 0.88,
                    "guidance_scale": 1.55,
                    "negative_prompt": "teeth, tooth, open mouth, longbody, lowres, bad anatomy, bad hands, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, mutant"
                }
            )
        
        # Save the enhanced image
        if output and len(output) > 0:
            with open(output_path, "wb") as file:
                file.write(output[0].read())
            print(f"Saved enhanced image: {output_path}")
            return True
        else:
            print(f"No output received for {image_path.name}")
            return False
            
    except Exception as e:
        print(f"Error enhancing image {image_path.name}: {e}")
        return False

def process_all_images():
    """Process all images in the compressed folder"""
    # Set up paths
    compressed_folder = Path("compressed")
    results_folder = Path("results")
    
    # Create results folder if it doesn't exist
    results_folder.mkdir(exist_ok=True)
    
    # Get all JPEG files from compressed folder
    image_files = list(compressed_folder.glob("*.jpeg"))
    
    print(f"Found {len(image_files)} images to process")
    
    successful = 0
    failed = 0
    
    for i, image_path in enumerate(image_files, 1):
        print(f"\n--- Processing {i}/{len(image_files)}: {image_path.name} ---")
        
        try:
            # Set output path (same name in results folder)
            output_path = results_folder / image_path.name
            
            # Skip if already processed
            if output_path.exists():
                print(f"Skipping {image_path.name} - already exists in results")
                continue
            
            # Enhance the image directly from file
            if enhance_image_from_file(image_path, output_path):
                successful += 1
                print(f"✓ Successfully processed {image_path.name}")
            else:
                failed += 1
                print(f"✗ Failed to process {image_path.name}")
            
            # Add a small delay to avoid rate limiting
            time.sleep(2)
            
        except Exception as e:
            print(f"Error processing {image_path.name}: {e}")
            failed += 1
            continue
    
    print(f"\n--- Processing Complete ---")
    print(f"Successfully processed: {successful}")
    print(f"Failed: {failed}")
    print(f"Total: {len(image_files)}")

if __name__ == "__main__":
    print("Starting batch image enhancement...")
    print("Using the same parameters as the example code")
    
    # Check if API key is set
    try:
        replicate.Client()
        print("Replicate client initialized successfully")
    except Exception as e:
        print(f"Error initializing Replicate client: {e}")
        print("Make sure your REPLICATE_API_TOKEN is set")
        exit(1)
    
    process_all_images()
