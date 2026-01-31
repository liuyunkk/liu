export async function onRequest({ request, env }) {
  // 1. 这里的 DB 必须在 EdgeOne 控制台完成绑定
  const KV_NAMESPACE = env.DB; 
  const KEY_NAME = "dialog_for_android";

  try {
    // 2. 直接从 KV 读取并解析 JSON
    const data = await KV_NAMESPACE.get(KEY_NAME, { type: 'json' });

    if (!data) {
      return new Response(JSON.stringify({ error: "Data not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" }
      });
    }

    // 3. 直接输出 JSON
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*" // 允许 Android 客户端跨域调用
      }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Server Error", msg: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
