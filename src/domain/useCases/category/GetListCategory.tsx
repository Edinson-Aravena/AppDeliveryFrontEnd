import { CategoryRepositoryImple } from "../../../Data/repositories/CategoryRepository";

const { getAll } = new CategoryRepositoryImple();

export const GetListCategoryUseCase = async () => {
    return await getAll();
}