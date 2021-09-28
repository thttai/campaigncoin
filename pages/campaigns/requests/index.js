import React, { Component } from 'react';
import { Button, Message, Table } from 'semantic-ui-react';
import Layout from '../../../components/Layout';
import RequestRow from '../../../components/RequestRow';
import Campaign from '../../../ethereum/campaign';
import { Link } from '../../../routes';

export default class RequestIndex extends Component {
    state = {
        errorMessage: ''
    }
    static async getInitialProps(props) {
        const { address } = props.query

        const campaign = Campaign(address)
        const requestCount = await campaign.methods.getRequestsCount().call();
        const approversCount = await campaign.methods.approversCount().call();

        const requests = await Promise.all(
            Array(parseInt(requestCount)).fill().map((element, index) => {
                return campaign.methods.requests(index).call()
            })
        )

        return { address, requests, requestCount, approversCount }
    }

    onError = (message) => {
        this.setState({ errorMessage: message})
    }

    renderRows() {
        return this.props.requests.map((request, index) => {
            return  <RequestRow
                        key={index}
                        id={index}
                        request={request}
                        address={this.props.address}
                        approversCount={this.props.approversCount}
                        onError={this.onError}
                    ></RequestRow>
        })
    }

    render() {
        const { Header, Row, HeaderCell, Body } = Table;
        return (
            <Layout>
                <h3>Requests</h3>
                <Link route={`/campaigns/${this.props.address}/requests/new`}>
                    <a><Button primary floated='right' style={{ marginBottom: '10px'}}>Add Request</Button></a>
                </Link>
                <Table>
                    <Header>
                        <Row>
                            <HeaderCell>Id</HeaderCell>
                            <HeaderCell>Description</HeaderCell>
                            <HeaderCell>Amount</HeaderCell>
                            <HeaderCell>Recipient</HeaderCell>
                            <HeaderCell>Approval Count</HeaderCell>
                            <HeaderCell>Approve</HeaderCell>
                            <HeaderCell>Finalize</HeaderCell>
                        </Row>
                    </Header>
                    <Body>
                        {this.renderRows()}
                    </Body>
                </Table>
                <div>Found {this.props.requestCount} requests.</div>
                <Message negative header='Oops!' content={this.state.errorMessage} hidden={!this.state.errorMessage} />
            </Layout>
        );
    }
}