/**
 * Helper function to validate API responses
 * @param {Response} res
 * @param {Object} json
 * @param {() => void} setAuth
 * @returns {void}
 */

export function validateAdminResponse(res, json, setAuth) {
  if (res.status === 401) {
    console.error(json.message);
    return setAuth(null);
  } else if (!res.ok) {
    throw new Error(json.message);
  }
}
