export const getCategoryInfo = (category) => {
  switch (category) {
    case 'fruits':
      return {
        emoji: '🍎',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        textColor: 'text-red-600'
      };
    case 'vegetables':
      return {
        emoji: '🥕',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        textColor: 'text-green-600'
      };
    case 'dairy':
      return {
        emoji: '🥛',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200',
        textColor: 'text-blue-600'
      };
    case 'grains':
      return {
        emoji: '🌾',
        bgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-200',
        textColor: 'text-yellow-600'
      };
    default:
      return {
        emoji: '📦',
        bgColor: 'bg-gray-50',
        borderColor: 'border-gray-200',
        textColor: 'text-gray-600'
      };
  }
};