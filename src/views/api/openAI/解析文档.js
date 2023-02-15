/**
 * 解析 网页元素
 * @see https://platform.openai.com/docs/api-reference
 * */

const apiRef = document.querySelector('.api-ref')

/**
 *
 * @type {Array<{group: Element, apis: Array<HTMLElement>}>}
 */
const apiGroup = []
/**
 * @type {{group: Element, apis: Array<HTMLElement>} | null}
 */
let tempGroup = null

for (const child of apiRef.children) {
    // 新组开始, 旧组结束
    if (child.className === 'section md') {
        if (tempGroup) {
            apiGroup.push(tempGroup)
            tempGroup = null
        }
        tempGroup = { group: child, apis: [] }
    }
    // API 文档节点
    if (child.className === 'section endpoint') {
        tempGroup.apis.push(child)
    }
}

const HttpMethodMapping = {
    'GET': 'HttpMethod.GET',
    'POST': 'HttpMethod.POST',
    'PUT': 'HttpMethod.PUT',
    'DELETE': 'HttpMethod.DELETE',
    '获取': 'HttpMethod.GET',
    '发布': 'HttpMethod.POST',
    '放': 'HttpMethod.PUT',
    '删除': 'HttpMethod.DELETE',
}

// 提取 DOM 节点中的信息
const info = apiGroup.map(({ group, apis }) => {
    const titleEle = group.querySelector('h2')
    const title = titleEle.innerText
    const link = group.querySelector('.anchor-heading-link')?.['href']

    const apiArr = apis.map(api => {
        // 左侧文档
        const leftEle = api.querySelector('.section-left')
        const titleEle = leftEle.querySelector('a[class="anchor-heading-link"]')
        const title = titleEle.innerText
        const link = titleEle['href']
        const method = leftEle.querySelector('.endpoint-method').innerText
        const url = leftEle.querySelector('.endpoint-path').innerText
        const desc = leftEle.querySelector('.endpoint-summary').innerText

        // 右侧示例
        const rightEle = api.querySelector('.section-right')

        const codeArr = Array.from(rightEle.querySelectorAll('.code-sample'))
            .map(e => {
                    return Array.from(e.querySelector('pre > code')?.childNodes?.values() ?? [])
                        // 过滤行号
                        .filter(i => i.nodeName !== 'CODE')
                        .map(i => i.nodeValue || i.innerText)
                        .join('')
                },
            )

        let request = ''
        let param = ''
        let response = ''
        if (codeArr.length === 2) {
            request = codeArr[0]
            response = codeArr[1]
        }
        if (codeArr.length === 3) {
            request = codeArr[0]
            param = codeArr[1]
            response = codeArr[2]
        }

        return {
            title,
            desc,
            link,
            request,
            response,
            param,
            url,
            method: HttpMethodMapping[method.toLocaleUpperCase()],
        }
    })

    return { title, link, apiArr }
})

// 代码生成
info.map(({ title, link, apiArr }) => {
    const value = apiArr.map(({ title, desc, link, url, method, request, response, param }) => {
        return `
            '${ title }': {
                url: '${ url.replace('https://api.openai.com', '') }',
                method: ${ method },
                body: \`${ param }\`,
                title: '${ title }',
                desc: \`${ desc }\`,
                link: '${ link }',
                request: \`${ String(request).trim() }\`,
                response: \`${ String(response) }\`
            }
        `
    }).join(',')

    return `
        /**
         * @see ${ link }
         */
        export const ${ title } = {
            ${ value }
        }
    `
}).join('\n')
