import { CategoryRepositoryImple } from "../../../Data/repositories/CategoryRepository"

const {remove} = new CategoryRepositoryImple

export const DeleteCategoryUseCase = async (id: string) => {
    return await remove(id)
}