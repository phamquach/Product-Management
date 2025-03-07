export const deleteData = async (url: string, id: string) => {
    try {
        const res = await fetch(`${url}/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return res
    } catch {
        console.log("Delete product failed, try again!")
    }
}
