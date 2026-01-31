export async function onRequest(context) {
  // 调试：看看 env 到底在不在 context 里
  const { env, request } = context;
  
  if (!env) {
    return new Response(JSON.stringify({ 
      error: "Context 结构异常", 
      context_keys: Object.keys(context) 
    }), { status: 500 });
  }

  if (!env.DB) {
    return new Response(JSON.stringify({ 
      error: "env.DB 依然不存在", 
      available_env_keys: Object.keys(env), // 这里会列出所有成功绑定的变量名
      tip: "如果这里没有 DB，说明绑定配置未生效"
    }), { status: 500 });
  }

  try {
    const data = await env.DB.get("dialog_for_android", { type: "json" });
    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json; charset=utf-8" }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}
