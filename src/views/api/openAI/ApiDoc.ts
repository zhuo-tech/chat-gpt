import { HttpMethod } from '@/views/api/Constant'

/**
 * @see https://platform.openai.com/docs/api-reference/introduction
 */
export const Introduction = {}

/**
 * @see https://platform.openai.com/docs/api-reference/authentication
 */
export const Authentication = {}

/**
 * @see https://platform.openai.com/docs/api-reference/making-requests
 */
export const 提出请求 = {}

/**
 * @see https://platform.openai.com/docs/api-reference/models
 */
export const Model = {

    '列出模型': {
        url: '/v1/models',
        method: HttpMethod.GET,
        body: ``,
        title: '列出模型',
        desc: `列出当前可用的模型，并提供有关每个模型的基本信息，例如所有者和可用性。`,
        link: 'https://platform.openai.com/docs/api-reference/models/list',
        request: `curl https://api.openai.com/v1/models \
  -H 'Authorization: Bearer YOUR_API_KEY'`,
        response: `{
  "data": [
    {
      "id": "model-id-0",
      "object": "model",
      "owned_by": "organization-owner",
      "permission": [...]
    },
    {
      "id": "model-id-1",
      "object": "model",
      "owned_by": "organization-owner",
      "permission": [...]
    },
    {
      "id": "model-id-2",
      "object": "model",
      "owned_by": "openai",
      "permission": [...]
    },
  ],
  "object": "list"
}`,
    }
    ,
    '检索模型': {
        url: '/v1/models/{模型}',
        method: HttpMethod.GET,
        body: ``,
        title: '检索模型',
        desc: `检索模型实例，提供有关模型的基本信息，例如所有者和权限。`,
        link: 'https://platform.openai.com/docs/api-reference/models/retrieve',
        request: `curl https://api.openai.com/v1/models/text-davinci-003 \
  -H 'Authorization: Bearer YOUR_API_KEY'`,
        response: `{
  "id": "text-davinci-003",
  "object": "model",
  "owned_by": "openai",
  "permission": [...]
}`,
    },

}

/**
 * @see https://platform.openai.com/docs/api-reference/completions
 */
export const Finish = {

    '创建完成': {
        url: '/v1/completions',
        method: HttpMethod.POST,
        body: `{
  "model": "text-davinci-003",
  "prompt": "Say this is a test",
  "max_tokens": 7,
  "temperature": 0,
  "top_p": 1,
  "n": 1,
  "stream": false,
  "logprobs": null,
  "stop": "\\n"
}`,
        title: '创建完成',
        desc: `为提供的提示和参数创建补全`,
        link: 'https://platform.openai.com/docs/api-reference/completions/create',
        request: `curl https://api.openai.com/v1/completions \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer YOUR_API_KEY' \
  -d '{
  "model": "text-davinci-003",
  "prompt": "Say this is a test",
  "max_tokens": 7,
  "temperature": 0
}'`,
        response: `{
  "id": "cmpl-uqkvlQyYK7bGYrRHQ0eXlWi7",
  "object": "text_completion",
  "created": 1589478378,
  "model": "text-davinci-003",
  "choices": [
    {
      "text": "\n\nThis is indeed a test",
      "index": 0,
      "logprobs": null,
      "finish_reason": "length"
    }
  ],
  "usage": {
    "prompt_tokens": 5,
    "completion_tokens": 7,
    "total_tokens": 12
  }
}`,
    },

}

/**
 * @see https://platform.openai.com/docs/api-reference/edits
 */
export const Edit = {

    '创建编辑': {
        url: '/v1/edits',
        method: HttpMethod.POST,
        body: `{
  "model": "text-davinci-edit-001",
  "input": "What day of the wek is it?",
  "instruction": "Fix the spelling mistakes",
}`,
        title: '创建编辑',
        desc: `为提供的输入、指令和参数创建新的编辑。`,
        link: 'https://platform.openai.com/docs/api-reference/edits/create',
        request: `curl https://api.openai.com/v1/edits \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer YOUR_API_KEY' \
  -d '{
  "model": "text-davinci-edit-001",
  "input": "What day of the wek is it?",
  "instruction": "Fix the spelling mistakes"
}'`,
        response: `{
  "object": "edit",
  "created": 1589478378,
  "choices": [
    {
      "text": "What day of the week is it?",
      "index": 0,
    }
  ],
  "usage": {
    "prompt_tokens": 25,
    "completion_tokens": 32,
    "total_tokens": 57
  }
}`,
    },

}

/**
 * @see https://platform.openai.com/docs/api-reference/images
 */
export const Image = {

    '创建映像试用版': {
        url: '/v1/images/generations',
        method: HttpMethod.POST,
        body: `{
  "prompt": "A cute baby sea otter",
  "n": 2,
  "size": "1024x1024"
}`,
        title: '创建映像试用版',
        desc: `创建给定提示的图像。`,
        link: 'https://platform.openai.com/docs/api-reference/images/create',
        request: `curl https://api.openai.com/v1/images/generations \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer YOUR_API_KEY' \
  -d '{
  "prompt": "A cute baby sea otter",
  "n": 2,
  "size": "1024x1024"
}'`,
        response: `{
  "created": 1589478378,
  "data": [
    {
      "url": "https://..."
    },
    {
      "url": "https://..."
    }
  ]
}`,
    }
    ,
    '创建图像编辑试用版': {
        url: '/v1/images/edits',
        method: HttpMethod.POST,
        body: ``,
        title: '创建图像编辑试用版',
        desc: `在给定原始图像和提示的情况下创建编辑或扩展的图像。`,
        link: 'https://platform.openai.com/docs/api-reference/images/create-edit',
        request: `curl https://api.openai.com/v1/images/edits \
  -H 'Authorization: Bearer YOUR_API_KEY' \
  -F image='@otter.png' \
  -F mask='@mask.png' \
  -F prompt="A cute baby sea otter wearing a beret" \
  -F n=2 \
  -F size="1024x1024"`,
        response: `{
  "created": 1589478378,
  "data": [
    {
      "url": "https://..."
    },
    {
      "url": "https://..."
    }
  ]
}`,
    }
    ,
    '创建图像变体试用版': {
        url: '/v1/images/variations',
        method: HttpMethod.POST,
        body: ``,
        title: '创建图像变体试用版',
        desc: `创建给定图像的变体。`,
        link: 'https://platform.openai.com/docs/api-reference/images/create-variation',
        request: `curl https://api.openai.com/v1/images/variations \
  -H 'Authorization: Bearer YOUR_API_KEY' \
  -F image='@otter.png' \
  -F n=2 \
  -F size="1024x1024"`,
        response: `{
  "created": 1589478378,
  "data": [
    {
      "url": "https://..."
    },
    {
      "url": "https://..."
    }
  ]
}`,
    },

}

/**
 * @see https://platform.openai.com/docs/api-reference/embeddings
 */
export const Embed = {

    '创建嵌入': {
        url: '/v1/embeddings',
        method: HttpMethod.POST,
        body: `{
  "model": "text-embedding-ada-002",
  "input": "The food was delicious and the waiter..."
}`,
        title: '创建嵌入',
        desc: `创建表示输入文本的嵌入向量。`,
        link: 'https://platform.openai.com/docs/api-reference/embeddings/create',
        request: `curl https://api.openai.com/v1/embeddings \
  -X POST \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"input": "The food was delicious and the waiter...",
       "model": "text-embedding-ada-002"}'`,
        response: `{
  "object": "list",
  "data": [
    {
      "object": "embedding",
      "embedding": [
        0.0023064255,
        -0.009327292,
        .... (1536 floats total for ada-002)
        -0.0028842222,
      ],
      "index": 0
    }
  ],
  "model": "text-embedding-ada-002",
  "usage": {
    "prompt_tokens": 8,
    "total_tokens": 8
  }
}`,
    },

}

/**
 * @see https://platform.openai.com/docs/api-reference/files
 */
export const File = {

    '列出文件': {
        url: '/v1/files',
        method: HttpMethod.GET,
        body: ``,
        title: '列出文件',
        desc: `返回属于用户组织的文件列表。`,
        link: 'https://platform.openai.com/docs/api-reference/files/list',
        request: `curl https://api.openai.com/v1/files \
  -H 'Authorization: Bearer YOUR_API_KEY'`,
        response: `{
  "data": [
    {
      "id": "file-ccdDZrC3iZVNiQVeEA6Z66wf",
      "object": "file",
      "bytes": 175,
      "created_at": 1613677385,
      "filename": "train.jsonl",
      "purpose": "search"
    },
    {
      "id": "file-XjGxS3KTG0uNmNOK362iJua3",
      "object": "file",
      "bytes": 140,
      "created_at": 1613779121,
      "filename": "puppy.jsonl",
      "purpose": "search"
    }
  ],
  "object": "list"
}`,
    }
    ,
    '上传文件': {
        url: '/v1/files',
        method: HttpMethod.POST,
        body: ``,
        title: '上传文件',
        desc: `上传包含要跨各种端点/功能使用的文档的文件。目前，一个组织上传的所有文件的大小最大为 1 GB。如果您需要增加存储限制，请联系我们。`,
        link: 'https://platform.openai.com/docs/api-reference/files/upload',
        request: `curl https://api.openai.com/v1/files \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -F purpose="fine-tune" \
  -F file='@mydata.jsonl'`,
        response: `{
  "id": "file-XjGxS3KTG0uNmNOK362iJua3",
  "object": "file",
  "bytes": 140,
  "created_at": 1613779121,
  "filename": "mydata.jsonl",
  "purpose": "fine-tune"
}`,
    }
    ,
    '删除文件': {
        url: '/v1/files/{file_id}',
        method: HttpMethod.DELETE,
        body: ``,
        title: '删除文件',
        desc: `删除文件。`,
        link: 'https://platform.openai.com/docs/api-reference/files/delete',
        request: `curl https://api.openai.com/v1/files/file-XjGxS3KTG0uNmNOK362iJua3 \
  -X DELETE \
  -H 'Authorization: Bearer YOUR_API_KEY'`,
        response: `{
  "id": "file-XjGxS3KTG0uNmNOK362iJua3",
  "object": "file",
  "deleted": true
}`,
    }
    ,
    '检索文件': {
        url: '/v1/files/{file_id}',
        method: HttpMethod.GET,
        body: ``,
        title: '检索文件',
        desc: `返回有关特定文件的信息。`,
        link: 'https://platform.openai.com/docs/api-reference/files/retrieve',
        request: `curl https://api.openai.com/v1/files/file-XjGxS3KTG0uNmNOK362iJua3 \
  -H 'Authorization: Bearer YOUR_API_KEY'`,
        response: `{
  "id": "file-XjGxS3KTG0uNmNOK362iJua3",
  "object": "file",
  "bytes": 140,
  "created_at": 1613779657,
  "filename": "mydata.jsonl",
  "purpose": "fine-tune"
}`,
    }
    ,
    '检索文件内容': {
        url: '/v1/files/{file_id}/内容',
        method: HttpMethod.GET,
        body: ``,
        title: '检索文件内容',
        desc: `返回指定文件的内容`,
        link: 'https://platform.openai.com/docs/api-reference/files/retrieve-content',
        request: ``,
        response: ``,
    },

}

/**
 * @see https://platform.openai.com/docs/api-reference/fine-tunes
 */
export const FineTune = {

    '创建微调': {
        url: '/v1/fine-tunes',
        method: HttpMethod.POST,
        body: ``,
        title: '创建微调',
        desc: `创建一个作业，用于微调给定数据集中的指定模型。

响应包括排队作业的详细信息，包括作业状态和完成后微调模型的名称。

了解有关微调的更多信息`,
        link: 'https://platform.openai.com/docs/api-reference/fine-tunes/create',
        request: `curl https://api.openai.com/v1/fine-tunes \
  -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{
  "training_file": "file-XGinujblHPwGLSztz8cPS8XY"
}'`,
        response: `{
  "id": "ft-AF1WoRqd3aJAHsqc9NY7iL8F",
  "object": "fine-tune",
  "model": "curie",
  "created_at": 1614807352,
  "events": [
    {
      "object": "fine-tune-event",
      "created_at": 1614807352,
      "level": "info",
      "message": "Job enqueued. Waiting for jobs ahead to complete. Queue number: 0."
    }
  ],
  "fine_tuned_model": null,
  "hyperparams": {
    "batch_size": 4,
    "learning_rate_multiplier": 0.1,
    "n_epochs": 4,
    "prompt_loss_weight": 0.1,
  },
  "organization_id": "org-...",
  "result_files": [],
  "status": "pending",
  "validation_files": [],
  "training_files": [
    {
      "id": "file-XGinujblHPwGLSztz8cPS8XY",
      "object": "file",
      "bytes": 1547276,
      "created_at": 1610062281,
      "filename": "my-data-train.jsonl",
      "purpose": "fine-tune-train"
    }
  ],
  "updated_at": 1614807352,
}`,
    }
    ,
    '列出微调': {
        url: '/v1/fine-tunes',
        method: HttpMethod.GET,
        body: ``,
        title: '列出微调',
        desc: `列出组织的微调作业`,
        link: 'https://platform.openai.com/docs/api-reference/fine-tunes/list',
        request: `curl https://api.openai.com/v1/fine-tunes \
  -H 'Authorization: Bearer YOUR_API_KEY'`,
        response: `{
  "object": "list",
  "data": [
    {
      "id": "ft-AF1WoRqd3aJAHsqc9NY7iL8F",
      "object": "fine-tune",
      "model": "curie",
      "created_at": 1614807352,
      "fine_tuned_model": null,
      "hyperparams": { ... },
      "organization_id": "org-...",
      "result_files": [],
      "status": "pending",
      "validation_files": [],
      "training_files": [ { ... } ],
      "updated_at": 1614807352,
    },
    { ... },
    { ... }
  ]
}`,
    }
    ,
    '检索微调': {
        url: '/v1/fine-tunes/{fine_tune_id}',
        method: HttpMethod.GET,
        body: ``,
        title: '检索微调',
        desc: `获取有关微调作业的信息。

了解有关微调的更多信息`,
        link: 'https://platform.openai.com/docs/api-reference/fine-tunes/retrieve',
        request: `curl https://api.openai.com/v1/fine-tunes/ft-AF1WoRqd3aJAHsqc9NY7iL8F \
  -H "Authorization: Bearer YOUR_API_KEY"`,
        response: `{
  "id": "ft-AF1WoRqd3aJAHsqc9NY7iL8F",
  "object": "fine-tune",
  "model": "curie",
  "created_at": 1614807352,
  "events": [
    {
      "object": "fine-tune-event",
      "created_at": 1614807352,
      "level": "info",
      "message": "Job enqueued. Waiting for jobs ahead to complete. Queue number: 0."
    },
    {
      "object": "fine-tune-event",
      "created_at": 1614807356,
      "level": "info",
      "message": "Job started."
    },
    {
      "object": "fine-tune-event",
      "created_at": 1614807861,
      "level": "info",
      "message": "Uploaded snapshot: curie:ft-acmeco-2021-03-03-21-44-20."
    },
    {
      "object": "fine-tune-event",
      "created_at": 1614807864,
      "level": "info",
      "message": "Uploaded result files: file-QQm6ZpqdNwAaVC3aSz5sWwLT."
    },
    {
      "object": "fine-tune-event",
      "created_at": 1614807864,
      "level": "info",
      "message": "Job succeeded."
    }
  ],
  "fine_tuned_model": "curie:ft-acmeco-2021-03-03-21-44-20",
  "hyperparams": {
    "batch_size": 4,
    "learning_rate_multiplier": 0.1,
    "n_epochs": 4,
    "prompt_loss_weight": 0.1,
  },
  "organization_id": "org-...",
  "result_files": [
    {
      "id": "file-QQm6ZpqdNwAaVC3aSz5sWwLT",
      "object": "file",
      "bytes": 81509,
      "created_at": 1614807863,
      "filename": "compiled_results.csv",
      "purpose": "fine-tune-results"
    }
  ],
  "status": "succeeded",
  "validation_files": [],
  "training_files": [
    {
      "id": "file-XGinujblHPwGLSztz8cPS8XY",
      "object": "file",
      "bytes": 1547276,
      "created_at": 1610062281,
      "filename": "my-data-train.jsonl",
      "purpose": "fine-tune-train"
    }
  ],
  "updated_at": 1614807865,
}`,
    }
    ,
    '取消微调': {
        url: '/v1/fine-tunes/{fine_tune_id}/取消',
        method: HttpMethod.POST,
        body: ``,
        title: '取消微调',
        desc: `立即取消微调作业。`,
        link: 'https://platform.openai.com/docs/api-reference/fine-tunes/cancel',
        request: `curl https://api.openai.com/v1/fine-tunes/ft-AF1WoRqd3aJAHsqc9NY7iL8F/cancel \
  -X POST \
  -H "Authorization: Bearer YOUR_API_KEY"`,
        response: `{
  "id": "ft-xhrpBbvVUzYGo8oUO1FY4nI7",
  "object": "fine-tune",
  "model": "curie",
  "created_at": 1614807770,
  "events": [ { ... } ],
  "fine_tuned_model": null,
  "hyperparams": { ... },
  "organization_id": "org-...",
  "result_files": [],
  "status": "cancelled",
  "validation_files": [],
  "training_files": [
    {
      "id": "file-XGinujblHPwGLSztz8cPS8XY",
      "object": "file",
      "bytes": 1547276,
      "created_at": 1610062281,
      "filename": "my-data-train.jsonl",
      "purpose": "fine-tune-train"
    }
  ],
  "updated_at": 1614807789,
}`,
    }
    ,
    'List fine-tune events': {
        url: '/v1/fine-tunes/{fine_tune_id}/events',
        method: HttpMethod.GET,
        body: ``,
        title: 'List fine-tune events',
        desc: `Get fine-grained status updates for a fine-tune job.`,
        link: 'https://platform.openai.com/docs/api-reference/fine-tunes/events',
        request: `curl https://api.openai.com/v1/fine-tunes/ft-AF1WoRqd3aJAHsqc9NY7iL8F/events \
  -H "Authorization: Bearer YOUR_API_KEY"`,
        response: `{
  "object": "list",
  "data": [
    {
      "object": "fine-tune-event",
      "created_at": 1614807352,
      "level": "info",
      "message": "Job enqueued. Waiting for jobs ahead to complete. Queue number: 0."
    },
    {
      "object": "fine-tune-event",
      "created_at": 1614807356,
      "level": "info",
      "message": "Job started."
    },
    {
      "object": "fine-tune-event",
      "created_at": 1614807861,
      "level": "info",
      "message": "Uploaded snapshot: curie:ft-acmeco-2021-03-03-21-44-20."
    },
    {
      "object": "fine-tune-event",
      "created_at": 1614807864,
      "level": "info",
      "message": "Uploaded result files: file-QQm6ZpqdNwAaVC3aSz5sWwLT."
    },
    {
      "object": "fine-tune-event",
      "created_at": 1614807864,
      "level": "info",
      "message": "Job succeeded."
    }
  ]
}`,
    }
    ,
    'Delete fine-tune model': {
        url: '/v1/models/{model}',
        method: HttpMethod.DELETE,
        body: ``,
        title: 'Delete fine-tune model',
        desc: `Delete a fine-tuned model. You must have the Owner role in your organization.`,
        link: 'https://platform.openai.com/docs/api-reference/fine-tunes/delete-model',
        request: `curl https://api.openai.com/v1/models/curie:ft-acmeco-2021-03-03-21-44-20 \
  -X DELETE \
  -H "Authorization: Bearer YOUR_API_KEY"`,
        response: `{
  "id": "curie:ft-acmeco-2021-03-03-21-44-20",
  "object": "model",
  "deleted": true
}`,
    },

}

/**
 * @see https://platform.openai.com/docs/api-reference/moderations
 */
export const Moderations = {

    'Create moderation': {
        url: '/v1/moderations',
        method: HttpMethod.POST,
        body: `{
  "input": "I want to kill them."
}`,
        title: 'Create moderation',
        desc: `Classifies if text violates OpenAI's Content Policy`,
        link: 'https://platform.openai.com/docs/api-reference/moderations/create',
        request: `curl https://api.openai.com/v1/moderations \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer YOUR_API_KEY' \
  -d '{
  "input": "I want to kill them."
}'`,
        response: `{
  "id": "modr-5MWoLO",
  "model": "text-moderation-001",
  "results": [
    {
      "categories": {
        "hate": false,
        "hate/threatening": true,
        "self-harm": false,
        "sexual": false,
        "sexual/minors": false,
        "violence": true,
        "violence/graphic": false
      },
      "category_scores": {
        "hate": 0.22714105248451233,
        "hate/threatening": 0.4132447838783264,
        "self-harm": 0.005232391878962517,
        "sexual": 0.01407341007143259,
        "sexual/minors": 0.0038522258400917053,
        "violence": 0.9223177433013916,
        "violence/graphic": 0.036865197122097015
      },
      "flagged": true
    }
  ]
}`,
    },

}

/**
 * @see https://platform.openai.com/docs/api-reference/engines
 */
export const Engines = {

    'List enginesDeprecated': {
        url: '/v1/engines',
        method: HttpMethod.GET,
        body: ``,
        title: 'List enginesDeprecated',
        desc: `Lists the currently available (non-finetuned) models, and provides basic information about each one such as the owner and availability.`,
        link: 'https://platform.openai.com/docs/api-reference/engines/list',
        request: `curl https://api.openai.com/v1/engines \
  -H 'Authorization: Bearer YOUR_API_KEY'`,
        response: `{
  "data": [
    {
      "id": "engine-id-0",
      "object": "engine",
      "owner": "organization-owner",
      "ready": true
    },
    {
      "id": "engine-id-2",
      "object": "engine",
      "owner": "organization-owner",
      "ready": true
    },
    {
      "id": "engine-id-3",
      "object": "engine",
      "owner": "openai",
      "ready": false
    },
  ],
  "object": "list"
}`,
    }
    ,
    'Retrieve engineDeprecated': {
        url: '/v1/engines/{engine_id}',
        method: HttpMethod.GET,
        body: ``,
        title: 'Retrieve engineDeprecated',
        desc: `Retrieves a model instance, providing basic information about it such as the owner and availability.`,
        link: 'https://platform.openai.com/docs/api-reference/engines/retrieve',
        request: `curl https://api.openai.com/v1/engines/text-davinci-003 \
  -H 'Authorization: Bearer YOUR_API_KEY'`,
        response: `{
  "id": "text-davinci-003",
  "object": "engine",
  "owner": "openai",
  "ready": true
}`,
    },

}
