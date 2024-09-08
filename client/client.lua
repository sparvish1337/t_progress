local function OpenNui(arg)
  SetNuiFocus(arg, false)
  SendNUIMessage({
      action = 'setVisible',
      data = arg
  })
end


RegisterCommand('open-ui', function()
  OpenNui(true)
end)

RegisterNUICallback('hide-ui', function(_, cb)
  OpenNui(false)
  cb({})
end)

exports('ShowProgressBar', function(duration, label)
  OpenNui(true)
  SetNuiFocus(false, false)
  SendNUIMessage({
      action = 'updateProgress',
      data = {
          duration = duration,
          label = label
      }
  })
end)

RegisterCommand('start-progress', function(source, args)
  --print("Command triggered!")
  local duration = tonumber(args[1]) or 5000
  local label = args[2] or "Processing..."
  --print("Duration: " .. duration .. ", Label: " .. label)
  exports['sparven-ui']:ShowProgressBar(duration, label)
end, false)
