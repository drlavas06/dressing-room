import Replicate from 'replicate';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};


export default async function handler(req, res) {
  // Check HTTP method
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  console.log("API Route Started");
  console.log("Request body:", req.body);

  // Validate request body
  if (!req.body.target || !req.body.swap) {
    return res.status(400).json({ 
      error: 'Missing required fields', 
      received: req.body 
    });
  }

  try {
    const replicate = new Replicate({
      auth: "r8_LiVOPVlW2se6uulbhk1b0eYYixyRa7U3kRiFd",
    });

    console.log("Initiating face swap...");
    
    const swapped = await replicate.run(
      "lucataco/faceswap:9a4298548422074c3f57258c5d544497314ae4112df80d116f0d2109e843d20d",
      {
        input: {
          target_image: req.body.target,
          swap_image: req.body.swap,
        }
      }
    );

    console.log("Face swap completed:", swapped);
    return res.status(200).json(swapped);

  } catch (error) {
    console.error("Face swap error:", error);
    return res.status(500).json({ 
      error: 'Face swap failed', 
      message: error.message 
    });
  }
}