import { MenuItem, MenuItemIcon, MenuItemText, MenuItemLabel } from '@/components/Common/DropdownElemStyles';
import AtomicDropdownModal from '@/components/Common/AtomicDropdownElements';

type Currency = {
    code: string;

    symbol: string;
    flag: string;
};

type CurrencyModalProps = {
    isOpen: boolean;
    onClose: () => void;
    anchorElement?: HTMLElement | null;
    selectedCurrency: Currency;
    onCurrencySelect: (currency: Currency) => void;
};

const currencies: Currency[] = [
    { code: 'USD', symbol: '$', flag: '🇺🇸' },
    { code: 'EUR', symbol: '€', flag: '🇪🇺' },
    { code: 'UZS', symbol: '$', flag: '🇺🇿' },
];
export default function CurrencyModal({
    isOpen,
    onClose,
    anchorElement,
    selectedCurrency,
    onCurrencySelect,
}: CurrencyModalProps) {
    const handleCurrencySelect = (currency: Currency) => {
        onCurrencySelect(currency);
        onClose();
    };

    return (
        <AtomicDropdownModal
            isOpen={isOpen}
            onClose={onClose}
            anchorElement={anchorElement}
            width="150px"
            modalWidth={150}
            modalHeight={130}
            gap={20}
            alignment="left"
        >
            {currencies.map((currency) => (
                <MenuItem
                    key={currency.code}
                    isSelected={selectedCurrency.code === currency.code}
                    onClick={() => handleCurrencySelect(currency)}
                >
                    <MenuItemIcon>
                        <span style={{ fontSize: '18px' }}>{currency.flag}</span>
                    </MenuItemIcon>
                    <MenuItemText>
                        <MenuItemLabel>
                            {currency.symbol} {currency.code}
                        </MenuItemLabel>
                    </MenuItemText>
                </MenuItem>
            ))}
        </AtomicDropdownModal>
    );
}
