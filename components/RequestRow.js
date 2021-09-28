import React, { Component } from 'react'
import { Button, Table } from 'semantic-ui-react'
import Campaign from '../ethereum/campaign'
import web3 from '../ethereum/web3'
import { Router } from './../routes'

export default class RequestRow extends Component {
    state = {
        approving: false,
        finalizing: false
    }

    onApprove = async () => {
        this.setState({approving: true})
        this.props.onError('')
        try {
            const campaign = Campaign(this.props.address)
            const accounts = await web3.eth.getAccounts()
            await campaign.methods.approveRequest(this.props.id)
                                .send({ from: accounts[0]})

            Router.replaceRoute(`/campaigns/${this.props.address}/requests`)
        } catch (error) {
            this.props.onError(error.message)
        }
        this.setState({approving: false})
    }

    onFinalize = async () => {
        this.setState({finalizing: true})
        this.props.onError('')
        try {
            const campaign = Campaign(this.props.address)
            const accounts = await web3.eth.getAccounts()
            await campaign.methods.finalizeRequest(this.props.id)
                                .send({ from: accounts[0]})
            Router.replaceRoute(`/campaigns/${this.props.address}/requests`)
        } catch (error) {
            this.props.onError(error.message)
        }
        this.setState({finalizing: false})
    }

    render() {
        const { Row, Cell } = Table
        const { id, request, approversCount } = this.props
        const readyToFinalize = request.approvalCount > approversCount / 2

        return (
            <Row disabled={request.complete} positive={readyToFinalize && !request.complete}>
                <Cell>{id}</Cell>
                <Cell>{request.description}</Cell>
                <Cell>{web3.utils.fromWei(request.value, 'ether')}</Cell>
                <Cell>{request.recipient}</Cell>
                <Cell>{`${request.approvalCount}/${approversCount}`}</Cell>
                <Cell>
                    { request.complete ? null : (
                        <Button color='green' basic onClick={this.onApprove} loading={this.state.approving} disabled={this.state.approving}>Approve</Button>
                    )}
                </Cell>
                <Cell>
                    { request.complete ? null : (
                        <Button color='teal' basic onClick={this.onFinalize} loading={this.state.finalizing} disabled={this.state.finalizing}>Finalize</Button>
                    )}
                </Cell>
            </Row>
        )
    }
}