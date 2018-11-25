export const getFilterTitleMixin = () => getFilterFieldMixin('filterByTitle', 'title');

export const getFilterbyNameMixin = () => getFilterFieldMixin('filterByName', 'name');

export const getFilterbyClassificationMixin = () => getFilterFieldMixin('filterByClassification', 'classification');

export const getFilterbyDesignationMixin = () => getFilterFieldMixin('filterByDesignation', 'designation');

function getFilterFieldMixin(functionName, fieldName) {
  const mixin = {};
  mixin[functionName] = function (value) {
    return this.filterString(value, fieldName);
  }
  return mixin;
}