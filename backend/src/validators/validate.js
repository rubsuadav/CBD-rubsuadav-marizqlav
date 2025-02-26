
export function handleValidationErrors(error, res) {
    const keyError = error.message.split(":");
    return res.status(400).json({
      atributeError: keyError[1].trim(),
      message: keyError[2].trim().split(",")[0],
    });
  }