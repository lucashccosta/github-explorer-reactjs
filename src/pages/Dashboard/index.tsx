import React from 'react';
import { FiChevronRight } from 'react-icons/fi';

import githubLogo from '../../assets/images/github-logo.svg';

import { Title, Form, Repositories } from './styles';

const Dashboard: React.FunctionComponent = () => {
    return (
        <>
            <img src={githubLogo} alt="Github Explorer" />
            <Title>Explore Repositórios no Github</Title>

            <Form>
                <input placeholder="Digite o nome do repositório"/> 
                <button type="submit">Pesquisar</button>
            </Form>

            <Repositories>
                <a href="test">
                    <img src="https://avatars0.githubusercontent.com/u/3767743?s=460&u=35ad645bed13d2efa2844081fb4007f5ab25f4e4&v=4" 
                        alt="Lucas Costa"/>
                    
                    <div>
                        <strong>Lucas Costa Repo</strong>
                        <p>Lorem ipsum bla bla bla bla bla bla</p>
                    </div>

                    <FiChevronRight size={20} />
                </a>
            </Repositories>
        </>
    );
};

export default Dashboard;