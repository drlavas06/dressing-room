import replicate


output = replicate.run(
    "fermatresearch/magic-image-refiner:507ddf6f977a7e30e46c0daefd30de7d563c72322f9e4cf7cbac52ef0f667b13",
    input={
        "hdr": 0.06,
        "image": "https://replicate.delivery/pbxt/NSViZjQ6vGuhVwlI82yGxqKxV7DJEOXqJ9Jk3Hx9aEEfDRRD/jj.jpeg",
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

# To access the file URL:
print(output[0].url())
#=> "http://example.com"

# To write the file to disk:
with open("my-image.png", "wb") as file:
    file.write(output[0].read())