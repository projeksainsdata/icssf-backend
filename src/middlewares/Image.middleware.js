import uploadImage from "../../utils/uploadImage.js";
export async function ImageProfileMiddleware(req, res, next) {
  try {
    req.body.profile = await uploadImage(req.body.profile);
    next();
  } catch (error) {
    next(error);
  }
}

export async function ImageDestinationMiddleware(req, res, next) {
  try {
    req.body.image = await Promise.all(
      req.body.image.map(async (image, i) => {
        return {
          url: await uploadImage(image),
          thumbnail: i === 0 ? true : false,
        };
      })
    );

    next();
  } catch (error) {
    next(error);
  }
}
