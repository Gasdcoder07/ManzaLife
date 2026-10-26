export const customStyles = {
    control: (base, state) => ({
        ...base,
        minHeight: '42px',
        borderRadius: '0.5rem',
        borderColor: state.isFocused ? '#22d3ee' : '#e5e5e5',
        boxShadow: state.isFocused ? '0 0 0 4px rgba(34, 211, 238, 0.05)' : 'none',
        transition: 'all 0.2s ease-in-out',
        padding: '0 2px',
        cursor: 'pointer',
        '&:hover': {
        borderColor: state.isFocused ? '#22d3ee' : '#d4d4d4',
        },
    }),
    multiValue: (base) => ({
        ...base,
        backgroundColor: '#f5f5f5',
        borderRadius: '0.375rem',
    }),
    multiValueRemove: (base) => ({
        ...base,
        '&:hover': {
        backgroundColor: '#fee2e2',
        color: '#ef4444',
        },
}),
};