export default function versionResolver(req, res, next) {
  req.apiVersion = req.headers['api-version'] || 'v1';
  next();
}
