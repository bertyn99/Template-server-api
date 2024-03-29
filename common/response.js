function errorRes(res, err, errMsg = "failed operation", statusCode = 500) {
  return res.status(statusCode).json({ success: false, error: errMsg });
}

function successRes(res, data = {}, statusCode = 200) {
  return res.status(statusCode).json({ success: true, data });
}

function errData(res, errMsg = "failed operation") {
  return (err, data) => {
    if (err) return errorRes(res, err, errMsg);
    return successRes(res, data);
  };
}

export { errorRes, successRes, errData };
