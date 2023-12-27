/**
 * @type {import("astro").MiddlewareHandler}
 */
// export const onRequest = async ({ locals, request }, next) => {
//     const response = await next();
//     const html = await response.text();
//     const redactedHtml = html.replaceAll("私人信息", "已删除");

//     return new Response(redactedHtml, {
//         status: 200,
//         headers: response.headers
//     });
// }