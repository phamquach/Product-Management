export const postData = async (url: string, data:object) => {
    try {
        const res = await fetch(url, {
            method: "POST",
            body: JSON.stringify(data)
        })
        return res
    } catch {
        console.log("Post product failed, try again!")
    }
}