import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import { SearchIcon } from '~/components/Icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { useEffect, useState, useRef } from 'react';
import { useDebounce } from '~/hooks';
import * as searchServices from '~/apiServices/searchServices';
const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [forceRender, setForceRender] = useState(0);

    const debounced = useDebounce(searchValue, 500);

    const inputRef = useRef();
    const wrapperRef = useRef();

    useEffect(() => {
        if (!debounced.trim()) {
            setSearchResult([]);
            setShowResult(false);
            setForceRender((prev) => prev + 1);

            return;
        }

        // let isMounted = true;
        const fetchApi = async () => {
            setLoading(true);

            const result = await searchServices.search(debounced);

            const hasMatch = result.some((item) => item.full_name.toLowerCase().includes(debounced.toLowerCase()));
            if (hasMatch) {
                setSearchResult(result);
            } else {
                setSearchResult([]);
                setForceRender((prev) => prev + 1);
            }
            setLoading(false);
        };
        fetchApi();
    }, [debounced]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            //console.log('Clicked outside!', event.target); // Debugging
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                //console.log('Hiding Tippy...');
                setShowResult(false);
                setForceRender((prev) => prev + 1);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleChange = (e) => {
        const searchValue = e.target.value;

        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };

    return (
        <div ref={wrapperRef}>
            <HeadlessTippy
                key={forceRender}
                interactive
                appendTo={() => document.body}
                visible={showResult && searchResult.length > 0}
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <h4 className={cx('search-title')}>Account</h4>
                            {searchResult.map((result) => (
                                <AccountItem key={result.id} data={result} />
                            ))}
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={() => {
                    setShowResult(false);
                }}
            >
                <div className={cx('search')}>
                    <input
                        ref={inputRef}
                        value={searchValue}
                        placeholder="Search accounts and videos"
                        spellCheck={false}
                        onChange={handleChange}
                        onFocus={() => {
                            setShowResult(true);
                        }}
                    />
                    {!!searchValue && !loading && (
                        <button
                            className={cx('clear')}
                            onClick={() => {
                                setSearchValue('');
                                inputRef.current.focus();
                            }}
                        >
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}
                    {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}

                    <button className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()}>
                        <SearchIcon />
                    </button>
                </div>
            </HeadlessTippy>
        </div>
    );
}

export default Search;
