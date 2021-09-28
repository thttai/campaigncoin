import React, { Component } from 'react';
import { Button, Card, Icon, Message } from 'semantic-ui-react';
import Layout from '../components/Layout';
import factory from '../ethereum/factory';
import { Link } from '../routes'

export default class CampaignIndex extends Component {

    static async getInitialProps() {
        const campaigns = await factory.methods.getDeployedCampaigns().call();
        return { campaigns }
    }

    renderCampaign() {
        const items = this.props.campaigns.map(address => {
            return { 
                header: address,
                description: (
                    <Link route={`/campaigns/${address}`}><a>View Campaign</a></Link>
                ),
                fluid: true
            }
        })

        return <Card.Group items = {items} />
    }

    render() {
        return (
            <Layout>
                <div>
                    <h3>Open Campaigns</h3>
                    <Link route='/campaigns/new'>
                        <a>
                            <Button floated='right' content='Create Campaign' icon='add circle' primary labelPosition='left'></Button>
                        </a>
                    </Link>
                    {this.renderCampaign()}
                    <Message info>
                        <Message.Header>
                            <Icon name='info circle' />
                            What is Campaign Coin?
                        </Message.Header>
                        <p>Campaign Coin is a web app makes crowdfunding like Kickstarter, in fashion way.
                            <br/>
                            It's using Smart Contract to hold all money. This will prevent the creator using money in wrong way because he doesn't own money.
                        </p>
                        <p><b>How it work?</b></p>
                        <p>The creator create a campaign that is a smart contract in Ethereum network.
                            <br/>
                            People will send money to that contract to become a approver.
                            <br/>
                            Whenever the creator want to send amount of money to a supplier for example. He need to create a request and has to get approve by contributors.
                            <br/>
                            If the request has enough approvals, the money in the contract will be sent to the supplier automatically.
                        </p>
                    </Message>
                </div>
            </Layout>
        );
    }
}
