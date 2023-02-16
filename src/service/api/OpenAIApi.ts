import { openAIProxy } from '@/service/api/CloudFun'

const HOST = 'https://api.openai.com'

/**
 * @see https://platform.openai.com/docs/api-reference/models/list
 */
export class OpenAIApi {

    /**
     * 列出当前可用的模型，并提供有关每个模型的基本信息，例如所有者和可用性
     */
    public static modelsList() {
        return openAIProxy<OpenAI.ModelListResponse>({
            url: HOST + '/v1/models',
            method: 'GET',
        })
    }

    /**
     * 检索模型实例，提供有关模型的基本信息，例如所有者和权限。
     * @param id 模型ID
     */
    public static modules(id: OpenAI.Model['id']) {
        return openAIProxy<OpenAI.Model>({
            url: HOST + '/v1/models/' + id,
            method: 'GET',
        })
    }

    /**
     * 给定提示，模型将返回一个或多个预测完成，还可以返回每个位置的替代令牌的概率。
     */
    public static completions(param: OpenAI.CompletionParam) {
        return openAIProxy<OpenAI.CompletionResponse>({
            url: HOST + '/v1/completions',
            method: 'POST',
            body: param,
        })
    }

    /**
     * 为提供的输入、指令和参数创建新的编辑。
     */
    public static edit(param: OpenAI.EditParam) {
        return openAIProxy<OpenAI.EditResponse>({
            url: HOST + '/v1/edits',
            method: 'POST',
            body: param,
        })
    }

    /**
     * 创建给定提示的图像。
     */
    public static images(param: OpenAI.ImageGenParam) {
        return openAIProxy<OpenAI.ImageGenResponse>({
            url: HOST + '/v1/images/generations',
            method: 'POST',
            body: param,
        })
    }

    /**
     * 在给定原始图像和提示的情况下创建编辑或扩展的图像。
     */
    public static imagesEdit(param: OpenAI.ImageEditParam) {
        // 疑似 FormData
        return openAIProxy<OpenAI.ImageEditResponse>({
            url: HOST + '/v1/images/edits',
            method: 'POST',
            body: param,
        })
    }

    /**
     * 创建给定图像的变体。
     */
    public static imagesVariations(param: OpenAI.ImageVariationsParam) {
        // 疑似 FormData
        return openAIProxy<OpenAI.ImageVariationsResponse>({
            url: HOST + '/v1/images/variations',
            method: 'POST',
            body: param,
        })
    }

    /**
     * 创建表示输入文本的嵌入向量
     * @see https://platform.openai.com/docs/api-reference/embeddings/create
     */
    public static embeddings(param: OpenAI.EmbeddingsParam) {
        return openAIProxy<OpenAI.EmbeddingsResponse>({
            url: HOST + '/v1/images/variations',
            method: 'POST',
            body: param,
        })
    }

}

/**
 * 文件用于上传可与微调等功能一起使用。
 * @see https://platform.openai.com/docs/api-reference/files
 */
export class OpenAIFileApi {
    /**
     * 返回属于用户组织的文件列表。
     */
    public static files() {
        return openAIProxy<OpenAI.FileListResponse>({
            url: HOST + '/v1/files',
            method: 'GET',
        })
    }

    /**
     * 上传包含要跨各种端点/功能使用的文档的文件。
     * 目前，一个组织上传的所有文件的大小最大为 1 GB。
     * 如果您需要增加存储限制，请联系我们。
     */
    public static upload(param: OpenAI.FileUploadParam) {
        // 疑似 FormData
        return openAIProxy<OpenAI.FileUploadResponse>({
            url: HOST + '/v1/files',
            method: 'POST',
            body: param,
        })
    }

    /**
     * 删除文件。
     */
    public static delete(fileId: string) {
        return openAIProxy<OpenAI.FileDeleteResponse>({
            url: HOST + '/v1/files/' + fileId,
            method: 'DELETE',
        })
    }

    /**
     * 检索文件
     */
    public static get(fileId: string) {
        return openAIProxy<OpenAI.File>({
            url: HOST + '/v1/files/' + fileId,
            method: 'GET',
        })
    }

    /**
     * 检索文件内容
     * 返回指定文件的内容
     */
    public static getContent(fileId: string, keyword: string) {
        return openAIProxy<string>({
            url: HOST + '/v1/files/' + fileId + '/' + keyword,
            method: 'GET',
        })
    }

}

/**
 * @see https://platform.openai.com/docs/api-reference/fine-tunes
 */
export class OpenAIFineTunesApi {

    /**
     * 创建
     * @see https://platform.openai.com/docs/api-reference/fine-tunes/create
     */
    public static create(param: OpenAI.TrainingFile) {
        return openAIProxy<string>({
            url: HOST + '/v1/fine-tunes',
            method: 'POST',
            body: param,
        })
    }

    /**
     * 列出
     * @see https://platform.openai.com/docs/api-reference/fine-tunes/list
     */
    public static list() {
        return openAIProxy<{ data: Array<OpenAI.TrainingFile>, object: string }>({
            url: HOST + '/v1/fine-tunes',
            method: 'GET',
        })
    }

    /**
     * 检索
     * @see https://platform.openai.com/docs/api-reference/fine-tunes/retrieve
     */
    public static retrieve(fineTuneId: string) {
        return openAIProxy<any>({
            url: HOST + '/v1/fine-tunes/' + fineTuneId,
            method: 'GET',
        })
    }

    /**
     * 取消
     * @see https://platform.openai.com/docs/api-reference/fine-tunes/cancel
     */
    public static cancel(fineTuneId: string) {
        return openAIProxy<any>({
            url: HOST + '/v1/fine-tunes/' + fineTuneId + '/cancel',
            method: 'GET',
        })
    }

    /**
     * 列出事件
     * @see https://platform.openai.com/docs/api-reference/fine-tunes/events
     */
    public static event(fineTuneId: string) {
        return openAIProxy<any>({
            url: HOST + '/v1/fine-tunes/' + fineTuneId + '/events',
            method: 'GET',
        })
    }

    /**
     * 删除模型
     * @see https://platform.openai.com/docs/api-reference/fine-tunes/delete-model
     */
    public static deleteModel(model: string) {
        return openAIProxy<any>({
            url: HOST + '/v1/models/' + model,
            method: 'GET',
        })
    }

}

declare namespace OpenAI {

    interface Model {
        id: string
        object: 'model'
        owned_by: string
        permission: Array<any>
    }

    interface ModelListResponse {
        data: Array<Model>
        object: 'list'
    }

    /**
     * @see https://platform.openai.com/docs/api-reference/completions/create#completions/create-model
     */
    interface CompletionParam {
        /**
         * 要使用的模型的 ID。可以使用列表模型 API 查看所有可用模型，或参阅模型概述了解它们的描述。
         */
        model: Model['id']
        /**
         * 用于生成完成、编码为字符串、字符串数组、标记数组或标记数组数组的提示。
         */
        prompt: string
        /**
         * 整数 自选 默认值为 16
         * 完成时要生成的最大令牌数。
         * 提示加号的令牌计数不能超过模型的上下文长度。大多数模型的上下文长度为 2048 个令牌（最新模型除外，它支持 4096）
         */
        max_tokens?: number
        /**
         * 默认值为 1
         * 使用什么采样温度，介于 0 和 2 之间。较高的值（如 0.8）将使输出更加随机，而较低的值（如 0.2）将使其更加集中和确定。
         * 我们通常建议更改此设置，但不要同时更改两者。{@link top_p}
         */
        temperature?: number
        /**
         * 默认值为 1
         * 使用温度采样的替代方法称为核心采样，其中模型考虑具有top_p概率质量的令牌的结果。因此，0.1 意味着只考虑包含前 10% 概率质量的代币。
         * 我们通常建议更改此设置，但不要同时更改两者。temperature
         */
        top_p?: number
        /**
         * 默认值为 1
         * 为每个提示生成的完成次数。
         * 注意：由于此参数会生成许多完成，因此它会快速消耗令牌配额。请谨慎使用，并确保对 和 进行合理的设置 {@link stop} {@code max_tokens}
         */
        n?: number
        /**
         * 默认为 false
         * 是否流式传输回部分进度。如果设置，令牌将在可用时作为纯数据服务器发送的事件发送，流由消息终止。data: [DONE]
         */
        stream?: boolean
        // noinspection SpellCheckingInspection
        /**
         * 默认值为空
         * 包括最可能的令牌的日志概率，以及所选令牌。例如，如果为 5，则 API 将返回 5 个最可能的令牌的列表。API 将始终返回采样令牌的 ，因此响应中最多可能有元素。logprobslogprobslogproblogprobs+1
         * 的最大值为 5。如果您需要更多，请通过我们的帮助中心与我们联系并描述您的使用案例。logprobs
         */
        logprobs?: number,
        /**
         * 默认为 false
         * 除了完成之外，还回显提示
         */
        echo?: boolean
        /**
         * 默认值为空
         * 最多 4 个序列，其中 API 将停止生成更多令牌。返回的文本将不包含停止序列。
         */
        stop?: string
        /**
         * 默认值为 0
         * 介于 -2.0 和 2.0 之间的数字。正值会根据新标记到目前为止是否出现在文本中来惩罚它们，从而增加模型讨论新主题的可能性
         */
        presence_penalty?: number
        /**
         * 默认值为 0
         * 介于 -2.0 和 2.0 之间的数字。正值会根据新标记到目前为止在文本中的现有频率来惩罚新标记，从而降低模型逐字重复同一行的可能性。
         */
        frequency_penalty?: number
        /**
         * 默认值为 1
         * 在服务器端生成完成并返回“最佳”（每个令牌的日志概率最高的那个）。无法流式传输结果。best_of
         * 与 一起使用时，控制候选完成次数并指定要返回的完成次数 – 必须大于 。n best_of n best_of n
         * 注意：由于此参数会生成许多完成，因此它会快速消耗令牌配额。请谨慎使用，并确保对 和 进行合理的设置。
         */
        best_of?: number
        // noinspection SpellCheckingInspection
        /**
         * 默认值为空
         * 修改完成中出现指定令牌的可能性。
         *
         * 接受将令牌（由其在 GPT 标记器中的令牌 ID 指定）映射到 -100 到 100 之间的关联偏差值的 json 对象。
         * 您可以使用此分词器工具（适用于 GPT-2 和 GPT-3）将文本转换为令牌 ID。
         * 在数学上，偏差在采样之前被添加到模型生成的对数中。确切的效果因模型而异，但介于 -1 和 1 之间的值应降低或增加选择的可能性;
         * 像 -100 或 100 这样的值应该会导致禁止或排他性选择相关令牌。
         */
        logit_bias?: any
        /**
         * 代表最终用户的唯一标识符，可帮助 OpenAI 监控和检测滥用行为。
         */
        user: string
    }

    interface CompletionResponse {
data: any
        id: string
        object: 'string' | 'text_completion'
        created: number
        model: Model['id']
        choices: Array<Choice>
        usage: Usage
    }

    interface Choice {
        text: string
        index: number
        // noinspection SpellCheckingInspection
        logprobs: any
        finish_reason: string
    }

    interface Usage {
        prompt_tokens: number
        completion_tokens: number
        total_tokens: number
    }

    interface EditParam {
        /**
         * 要使用的模型的 ID。可以使用列表模型 API 查看所有可用模型，或参阅模型概述了解它们的描述。
         */
        model: Model['id']
        /**
         * 默认为空
         * 要用作编辑起点的输入文本。
         */
        input?: string
        /**
         * 告知模型如何编辑提示的说明。
         */
        instruction: string
        /**
         * 默认值为 1
         * 使用什么采样温度，介于 0 和 2 之间。较高的值（如 0.8）将使输出更加随机，而较低的值（如 0.2）将使其更加集中和确定。
         * 我们通常建议更改此设置，但不要同时更改两者。{@link top_p}
         */
        temperature?: number
        /**
         * 默认值为 1
         * 使用温度采样的替代方法称为核心采样，其中模型考虑具有top_p概率质量的令牌的结果。因此，0.1 意味着只考虑包含前 10% 概率质量的代币。
         * 我们通常建议更改此设置，但不要同时更改两者。temperature
         */
        top_p?: number
        /**
         * 默认值为 1
         * 为每个提示生成的完成次数。
         * 注意：由于此参数会生成许多完成，因此它会快速消耗令牌配额。请谨慎使用，并确保对 和 进行合理的设置 {@link stop} {@code max_tokens}
         */
        n?: number
    }

    interface EditResponse {
        object: 'edit' | string
        created: number
        choices: Array<Choice>
        usage: Usage
    }

    interface ImageCommonParam {
        /**
         * 默认值为 1024x1024
         */
        size?: '256x256' | '512x512' | '1024x1024'
        /**
         * 默认 1
         * 要生成的图像数。必须介于 1 和 10 之间。
         */
        n?: number
        /**
         * 默认为 url
         * 返回生成的图像的格式。
         */
        response_format?: 'url' | 'b64_json'
        /**
         * 代表最终用户的唯一标识符，可帮助 OpenAI 监控和检测滥用行为。
         */
        user?: string
    }

    interface ImageGenParam extends ImageCommonParam {
        /**
         * 所需图像的文本描述。最大长度为 1000 个字符。
         */
        prompt: string
    }

    interface ImageGenResponse {
        created: number
        data: Array<{ url: string }>
    }

    interface ImageEditParam extends ImageGenParam {
        /**
         * 要编辑的图像。必须是有效的 PNG 文件，小于 4MB，并且是正方形。
         * 如果未提供蒙版，则图像必须具有透明度，该透明度将用作蒙版。
         */
        image: string
        /**
         * 字符串
         * 一个附加图像，其完全透明的区域（例如，alpha为零）指示应编辑的位置。
         * 必须是有效的 PNG 文件，小于 4MB，并且尺寸与 {@link image} 相同。
         */
        mask?: string
    }

    interface ImageEditResponse extends ImageGenResponse {}

    interface ImageVariationsParam extends ImageCommonParam {
        /**
         * 用作变体基础的图像。必须是有效的 PNG 文件，小于 4MB，并且是正方形。
         */
        image: string
    }

    interface ImageVariationsResponse extends ImageGenResponse {}

    interface EmbeddingsParam {
        /**
         * 要使用的模型的 ID。可以使用列表模型 API 查看所有可用模型，或参阅模型概述了解它们的描述。
         */
        model: Model['id']
        /**
         * 要为其嵌入的输入文本，编码为字符串或标记数组。
         * 若要在单个请求中获取多个输入的嵌入，请传递字符串数组或令牌数组数组。
         * 每个输入的长度不得超过 8192 个令牌。
         */
        input: string | Array<string>
        /**
         * 代表最终用户的唯一标识符，可帮助 OpenAI 监控和检测滥用行为。
         */
        user?: string
    }

    interface EmbeddingsResponse {
        object: 'list',
        data: Array<Embeddings>
        model: string
        usage: {
            prompt_tokens: number
            total_tokens: number
        }
    }

    interface Embeddings {
        object: 'embeddings'
        embedding: Array<number>
        index: number
    }

    interface File {
        id: string
        object: 'file',
        bytes: number
        created_at: number
        filename: string
        purpose: string
    }

    interface FileListResponse {
        data: Array<File>
        object: 'list'
    }

    interface FileUploadParam {
        /**
         * 要上传的 JSON 行文件的名称。
         * If the is set to "fine-tune", each line is a JSON record with "prompt" and "completion" fields representing your training examples. {@link purpose}
         */
        file: string
        /**
         * 上传文档的预期用途。
         * Use "fine-tune" for Fine-tuning. This allows us to validate the format of the uploaded file.
         */
        purpose: string | 'fine-tune'
    }

    interface FileUploadResponse extends File {}

    interface FileDeleteResponse {
        id: string
        object: 'file',
        deleted: boolean
    }

    /**
     * 训练文件
     */
    interface TrainingFile {
        training_file: string
        validation_file?: string
        model: string
        n_epochs?: number
        batch_size?: number
        learning_rate_multiplier?: number
        prompt_loss_weight?: number
        compute_classification_metrics?: boolean
        classification_n_classes?: number
        classification_positive_class?: string
        classification_betas?: Array<any>
        suffix?: string
    }
}
