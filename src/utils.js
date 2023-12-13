import item from "./components/item";

/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {String}
 */
export function plural(value, variants = {}, locale = 'ru-RU') {
  // Получаем фурму кодовой строкой: 'zero', 'one', 'two', 'few', 'many', 'other'
  // В русском языке 3 формы: 'one', 'few', 'many', и 'other' для дробных
  // В английском 2 формы: 'one', 'other'
  const key = new Intl.PluralRules(locale).select(value);
  // Возвращаем вариант по ключу, если он есть
  return variants[key] || '';
}

/**
 * Генератор чисел с шагом 1
 * @returns {Function}
 */
export function codeGenerator(start = 0) {
  return () => ++start;
}

/**
 * Форматирование разрядов числа
 * @param value {Number}
 * @param options {Object}
 * @returns {String}
 */
export function numberFormat(value, locale = 'ru-RU', options = {}) {
  return new Intl.NumberFormat(locale, options).format(value);
}


export function getCategoriesList(categories) {
 const list =  categories.map((item) => {
  return {value: item._id, title: item.title}
})
return list
}

export function prepareCategories(categories) {
  const CATEGORY_NEST_SEPARATOR = '-'

  const prepareNestedCategoryTitle = (originalTitle, nestedLevel) =>
    `${new Array(nestedLevel).fill(CATEGORY_NEST_SEPARATOR).join(' ')} ${originalTitle}`;

  return categories.reduce((newCategories, categoryItem, _, originalCategories) => {
    // если категория без родителя - пропускаем
    if (categoryItem.parent) {
      return newCategories;
    }

    // для начала добавляем категорию без родителя в итоговый массив
    newCategories.push(categoryItem);

    function findCategoryChildren(categoryWithChildren, nestedLevel) {
      for (let idx = 0; idx < originalCategories.length; idx++) {
        if (originalCategories[idx].parent && originalCategories[idx].parent._id === categoryWithChildren._id) {
          // добавляем ребенка в итоговый массив (с преобразованием тайтла) и идем искать его детей
          newCategories.push({ ...originalCategories[idx], title: prepareNestedCategoryTitle(originalCategories[idx].title, nestedLevel) });
          findCategoryChildren(originalCategories[idx], nestedLevel + 1);
        }
      }
    }

    // ищем детей категории без родителя
    findCategoryChildren(categoryItem, 1);
console.log(newCategories);
    return newCategories
  }, []);
}
