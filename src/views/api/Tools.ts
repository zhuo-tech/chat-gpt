/**
 * Tools
 *
 * @author 冰凝
 * @date 2023-02-15 14:59
 */

export function toOption<
    K extends PropertyKey,
    V extends PropertyKey,
    T extends Record<K, V>
>(obj: T): Array<{ label: V, value: K }> {
    if (!obj) {
        return []
    }

    return Object.entries(obj)
        .map(([ k, v ]) => ({ label: k, value: v } as any))
}
