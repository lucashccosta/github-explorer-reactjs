import React from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import githubLogo from '../../assets/images/github-logo.svg';
import { Header, RepositoryInfo, Issues } from './styles';

interface RepositoryParams {
    repository: string;
}

const Repository: React.FunctionComponent = () => {
    const { params } = useRouteMatch<RepositoryParams>();
    
    return (
        <>
            <Header>
                <img src={githubLogo} alt="Github Explorer" />
                <Link to="/">
                    <FiChevronLeft size={16} />
                    Voltar
                </Link>
            </Header>
            <RepositoryInfo>
                <header>
                    <img src="https://avatars0.githubusercontent.com/u/3767743?s=460&u=35ad645bed13d2efa2844081fb4007f5ab25f4e4&v=4" alt="Lucas Costa"/>
                    <div>
                        <strong>Rocketseat/unform</strong>
                        <p>Description</p>
                    </div>
                </header>
                <ul>
                    <li>
                        <strong>1808</strong>
                        <span>Stars</span>
                    </li>
                    <li>
                        <strong>48</strong>
                        <span>Forks</span>
                    </li>
                    <li>
                        <strong>67</strong>
                        <span>Issues Abertas</span>
                    </li>
                </ul>
            </RepositoryInfo>

            <Issues>
                <Link to="bla">
                    <div>
                        <strong>Issue name</strong>
                        <p>Issue description</p>
                    </div>

                    <FiChevronRight size={20} />
                </Link>
            </Issues>
        </>
    );
};

export default Repository;