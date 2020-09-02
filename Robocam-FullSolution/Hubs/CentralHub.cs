using Microsoft.AspNetCore.SignalR;
using Robocam_FullSolution.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ViewModels;
using ViewModels.Requests;

namespace WebcaManageR.Hubs
{
    public class CentralHub : Hub
    {
        private readonly ICommandsService _commandsService;

        public CentralHub(ICommandsService commandsService)
        {
            _commandsService = commandsService;
        }
        public async Task SendCommand(string message, string value)
        {
            await Clients.All.SendAsync("ReceiveCommand", message, value);

            //log the command in db
            await _commandsService.LogCommand(new CommandInsertVM
            {
                Content = message,
                Value = value
            });
        }

        public async Task SendRTCMessage(string message)
        {
            await Clients.All.SendAsync("ReceiveRTCMessage", message);
        }

        public async Task SendImage(string message)
        {
            await Clients.All.SendAsync("ReceiveImage", message);
        }

        public async Task SendSensorData(SensorDataVM data)
        {
            await Clients.All.SendAsync("ReceiveSensorData", data);
        }
    }
}
